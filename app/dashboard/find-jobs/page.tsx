import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSign } from "lucide-react"
import Header from "@/components/ui/custom/header"

export default async function FindJobsPage() {
  // Simulate fetching jobs from a database
  const jobs = [
    {
      id: "1",
      title: "Build a React App",
      description: "Looking for a React developer to build a web application.",
      budget: 500,
      skills: ["React", "JavaScript", "CSS"],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "open",
      createdAt: new Date().toISOString(),
      ownerName: "John Doe",
    },
    {
      id: "2",
      title: "Design a Logo",
      description: "Need a logo designed for my new startup.",
      budget: 200,
      skills: ["Graphic Design", "Logo Design"],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "open",
      createdAt: new Date().toISOString(),
      ownerName: "Jane Smith",
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
    <>
      <Header user={user} />
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Available Jobs</h1>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-10 text-center">
              <h2 className="text-xl font-semibold mb-2">No jobs available</h2>
              <p className="text-muted-foreground mb-6">Check back later for new job opportunities.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>Posted by {job.ownerName}</CardDescription>
                      </div>
                      <Badge className="bg-green-500">Open</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{job.budget} USDC</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/find-jobs/${job.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
