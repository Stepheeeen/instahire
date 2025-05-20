"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { postJob } from "@/app/actions/auth-actions"

const jobSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  budget: z.coerce.number().positive({
    message: "Budget must be greater than 0",
  }),
  skills: z.string().min(3, {
    message: "Please enter at least one skill",
  }),
  deadline: z.string().min(1, {
    message: "Please select a deadline",
  }),
})

type JobFormValues = z.infer<typeof jobSchema>

export function PostJobForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Get tomorrow's date in YYYY-MM-DD format for the default deadline
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0]

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 100,
      skills: "",
      deadline: tomorrowFormatted,
    },
  })

  async function onSubmit(data: JobFormValues) {
    setIsLoading(true)
    try {
      // Convert skills string to array
      const skillsArray = data.skills.split(",").map((skill) => skill.trim())

      await postJob(userId, {
        title: data.title,
        description: data.description,
        budget: data.budget,
        skills: skillsArray,
        deadline: new Date(data.deadline),
      })

      toast({
        title: "Job posted",
        description: "Your job has been posted successfully.",
      })

      router.push("/dashboard/my-jobs")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Posting failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Full Stack Developer Needed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the job requirements, responsibilities, and expectations"
                  className="resize-none min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget (USDC)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input type="date" min={tomorrowFormatted} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills (comma separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., JavaScript, React, Node.js" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm">
          <p className="font-medium text-primary">Important:</p>
          <p className="text-muted-foreground mt-1">
            The budget amount will be reserved from your wallet when you post this job. It will be held in escrow until
            the job is completed.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting job...
            </>
          ) : (
            "Post Job"
          )}
        </Button>
      </form>
    </Form>
  )
}
