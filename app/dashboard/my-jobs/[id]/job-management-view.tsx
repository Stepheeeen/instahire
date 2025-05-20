"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSign, ArrowLeft, Loader2, CheckCircle, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function JobManagementView({
  job,
  contractors,
  userId,
}: {
  job: any
  contractors: any[]
  userId: string
}) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleMarkComplete() {
    setIsMarkingComplete(true)
    try {
      // Simulate API call to mark job as complete
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Job Marked as Complete",
        description: "The job has been successfully marked as complete.",
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error marking job as complete",
        description: "There was an error marking the job as complete. Please try again.",
      })
    } finally {
      setIsMarkingComplete(false)
    }
  }

  async function handleAcceptContractor(contractorId: string) {
    setIsLoading(contractorId)
    try {
      // Simulate API call to accept contractor
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Contractor Accepted",
        description: "You have successfully accepted the contractor.",
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error accepting contractor",
        description: "There was an error accepting the contractor. Please try again.",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <>
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/dashboard/my-jobs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Jobs
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
          <Badge
            className={
              job.status === "open" ? "bg-green-500" : job.status === "in-progress" ? "bg-blue-500" : "bg-gray-500"
            }
          >
            {job.status === "open" ? "Open" : job.status === "in-progress" ? "In Progress" : "Completed"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(job.skills) && job.skills.map((skill: string, index: number) => (
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
        </Card>

        {job.status === "in-progress" && (
          <Card>
            <CardHeader>
              <CardTitle>Job Progress</CardTitle>
              <CardDescription>Mark the job as complete when the work is done</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
                <p className="text-sm">
                  <span className="font-medium">Current Status:</span> In progress with{" "}
                  {contractors.find((c: any) => c.id === job.contractorId)?.name}
                </p>
                <p className="text-sm mt-2">
                  When the work is completed to your satisfaction, mark it as complete. The funds will be released to
                  the contractor once both parties confirm completion.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleMarkComplete} disabled={isMarkingComplete}>
                {isMarkingComplete ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Work as Complete
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {job.status === "open" && (
          <Card>
            <CardHeader>
              <CardTitle>Applications ({contractors.length})</CardTitle>
              <CardDescription>Select a contractor to work with</CardDescription>
            </CardHeader>
            <CardContent>
              {contractors.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No applications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contractors.map((contractor: any) => (
                    <div key={contractor.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{contractor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Applied: {new Date(contractor.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{contractor.proposedRate} USDC</p>
                        <Button
                          onClick={() => handleAcceptContractor(contractor.id)}
                          disabled={isLoading === contractor.id}
                        >
                          {isLoading === contractor.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accept"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
