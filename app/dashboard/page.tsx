// Removed unused import
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Briefcase, Users, Clock } from "lucide-react"
import Header from "@/components/ui/custom/header";

type User = {
  name: string;
  userType: "project-owner" | "contractor";
};

type Wallet = {
  balance: number;
  address: string;
};

type Job = {
  id: string;
  title: string;
  status: "in-progress" | "open" | "completed";
  budget: number;
  applications: { id: string }[];
};

type Application = {
  id: string;
  jobTitle?: string;
  status: "accepted" | "pending";
  proposedRate: number;
  createdAt: string;
};

const user: User = {
  name: "John Doe",
  userType: "project-owner",
};

const wallet: Wallet = {
  balance: 1000,
  address: "0x1234567890abcdef",
};

const jobs: Job[] = [
  { id: "1", title: "Job 1", status: "in-progress", budget: 500, applications: [{ id: "1" }] },
  { id: "2", title: "Job 2", status: "open", budget: 300, applications: [] },
  { id: "3", title: "Job 3", status: "completed", budget: 700, applications: [{ id: "2" }] },
];

const applications: Application[] = [
  { id: "1", jobTitle: "Job 1", status: "accepted", proposedRate: 50, createdAt: "2023-01-01" },
  { id: "2", jobTitle: "Job 2", status: "pending", proposedRate: 30, createdAt: "2023-02-01" },
];

export default async function DashboardPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user}/>
      <main className="flex-1 container py-6 md:py-12 px-2">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {user.userType === "project-owner" ? "Project Owner" : "Contractor"}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wallet?.balance.toFixed(2)} USDC</div>
                {user.userType === "project-owner" && (
                  <Link href="/dashboard/wallet" className="text-xs text-primary hover:underline">
                    Fund wallet
                  </Link>
                )}
              </CardContent>
            </Card>

            {user.userType === "project-owner" ? (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {jobs.filter((job) => job.status === "in-progress").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Jobs currently in progress</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{jobs.filter((job) => job.status === "open").length}</div>
                    <p className="text-xs text-muted-foreground">Jobs accepting applications</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{jobs.filter((job) => job.status === "completed").length}</div>
                    <p className="text-xs text-muted-foreground">Successfully completed jobs</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {applications.filter((app) => app.status === "accepted").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Contracts currently in progress</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {applications.filter((app) => app.status === "pending").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Applications awaiting response</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{jobs.length}</div>
                    <p className="text-xs text-muted-foreground">Jobs you can apply for</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {user.userType === "project-owner" ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>Your recently posted jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {jobs.length > 0 ? (
                      <div className="space-y-4">
                        {jobs.slice(0, 3).map((job) => (
                          <div key={job.id} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Status: <span className="capitalize">{job.status}</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{job.budget} USDC</p>
                              <p className="text-sm text-muted-foreground">{job.applications.length} applications</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No jobs posted yet</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/my-jobs">View all jobs</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Address</CardTitle>
                    <CardDescription>Fund your wallet to post jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md break-all font-mono text-sm">
                      {wallet?.address}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Send USDC to this address to fund your wallet</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/wallet">Manage wallet</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your recent job applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.slice(0, 3).map((app) => (
                          <div key={app.id} className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">{app.jobTitle || "Job Application"}</p>
                              <p className="text-sm text-muted-foreground">
                                Status: <span className="capitalize">{app.status}</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{app.proposedRate} USDC</p>
                              <p className="text-sm text-muted-foreground">
                                Applied: {new Date(app.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No applications yet</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/applications">View all applications</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Address</CardTitle>
                    <CardDescription>Your payment wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md break-all font-mono text-sm">
                      {wallet?.address}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Payments will be sent to this wallet address</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/dashboard/wallet">View wallet</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
            <h3 className="text-lg font-medium text-primary">Getting Started</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {user.userType === "project-owner"
                ? "Start by funding your wallet and posting your first job to find skilled contractors."
                : "Complete your profile with your skills and resume to start applying for jobs."}
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InstaHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
