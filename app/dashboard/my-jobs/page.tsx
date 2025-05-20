import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSign, Users } from "lucide-react"

export default async function MyJobsPage() {
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
      applications: [],
    },
    {
      id: "2",
      title: "Design a Logo",
      description: "Need a logo designed for my new startup.",
      budget: 200,
      skills: ["Graphic Design", "Logo Design"],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "in-progress",
      createdAt: new Date().toISOString(),
      applications: [],
    },
  ]

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Jobs</h1>
          <Button asChild>
            <Link href="/dashboard/post-job">Post New Job</Link>
          </Button>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">No jobs posted yet</h2>
            <p className="text-muted-foreground mb-6">
              Post your first job to find skilled contractors for your projects.
            </p>
            <Button asChild>
              <Link href="/dashboard/post-job">Post Your First Job</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>Posted on {new Date(job.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge
                      className={
                        job.status === "open"
                          ? "bg-green-500"
                          : job.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                      }
                    >
                      {job.status === "open" ? "Open" : job.status === "in-progress" ? "In Progress" : "Completed"}
                    </Badge>
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
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{job.budget} USDC</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{job.applications.length} Applications</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/my-jobs/${job.id}`}>View Details</Link>
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
