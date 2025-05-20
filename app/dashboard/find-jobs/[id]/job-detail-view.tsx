"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSign, ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function JobDetailView({ job, userId }: { job: any; userId: string }) {
  const [isApplying, setIsApplying] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const hasApplied = job.applications.some((app: any) => app.contractorId === userId)

  async function handleApply() {
    setIsApplying(true)
    try {
      

      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })

      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Application failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/dashboard/find-jobs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">Posted by {job.ownerName}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Job Details</CardTitle>
            <Badge className="bg-green-500">Open</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-1">Budget</h3>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-lg font-medium">{job.budget} USDC</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Deadline</h3>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{new Date(job.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {hasApplied ? (
            <div className="w-full text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <p className="text-green-600 dark:text-green-400 font-medium">You have already applied for this job</p>
            </div>
          ) : (
            <Button className="w-full" onClick={handleApply} disabled={isApplying}>
              {isApplying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Applying...
                </>
              ) : (
                "Apply for this Job"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
