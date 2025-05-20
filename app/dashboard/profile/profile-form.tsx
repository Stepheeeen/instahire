"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

// Create a schema based on user type
const createProfileSchema = (userType: string): z.ZodSchema => {
  const baseSchema = {
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    country: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
  }

  if (userType === "contractor") {
    return z.object({
      ...baseSchema,
      skills: z.union([z.string(), z.array(z.string())]).optional(),
      ratePerHour: z.coerce.number().min(0).optional(),
      resume: z.string().optional(),
    })
  } else {
    return z.object({
      ...baseSchema,
      domainName: z.string().optional(),
    })
  }
}

export function ProfileForm({ profile }: { profile: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(createProfileSchema(profile.userType)),
    defaultValues: profile,
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      console.log("Profile data submitted:", data)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself" className="resize-none min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/avatar.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {profile.userType === "contractor" ? (
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold">Contractor Information</h2>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="JavaScript, React, Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ratePerHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (USDC)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/resume.pdf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-semibold">Project Owner Information</h2>

            <FormField
              control={form.control}
              name="domainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Domain (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating profile...
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
      </form>
    </Form>
  )
}
