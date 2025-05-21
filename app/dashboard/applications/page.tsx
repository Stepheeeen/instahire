import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar } from "lucide-react"

export default async function ApplicationsPage() {
  // Simulate fetching applications from a database
  const applications = [
    {
      id: "1",
      jobId: "1",
      jobTitle: "Build a React App",
      proposedRate: 500,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      jobId: "2",
      jobTitle: "Design a Logo",
      proposedRate: 200,
      status: "accepted",
      createdAt: new Date().toISOString(),
    },
  ]
  // Simulate user authentication
  const user = {
    userType: "contractor", // Example user type
    id: "user123", // Example user ID
  }
  if (user.userType !== "contractor") {
    redirect("/dashboard/my-jobs")
  }
  return (
    <div className="container py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <Button asChild>
            <Link href="/dashboard/find-jobs">Find More Jobs</Link>
          </Button>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">No applications yet</h2>
            <p className="text-muted-foreground mb-6">Start applying for jobs to see your applications here.</p>
            <Button asChild>
              <Link href="/dashboard/find-jobs">Browse Available Jobs</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{application.jobTitle || "Job Application"}</CardTitle>
                      <CardDescription>
                        Applied on {new Date(application.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        application.status === "pending"
                          ? "bg-yellow-500"
                          : application.status === "accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }
                    >
                      {application.status === "pending"
                        ? "Pending"
                        : application.status === "accepted"
                          ? "Accepted"
                          : "Rejected"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Proposed Rate: {application.proposedRate} USDC</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/find-jobs/${application.jobId}`}>View Job Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
