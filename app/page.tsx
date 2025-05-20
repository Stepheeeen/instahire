import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="auth-container">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">InstaHire</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Link href="/auth/register" className="text-sm font-medium hover:text-primary">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Hire Contractors Instantly
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Connect with skilled contractors or find your next project with secure escrow payments.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/register">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-950/30 dark:to-gray-900/30 rounded-lg shadow-lg flex items-center justify-center">
                    <div className="auth-card w-[80%] max-w-sm">
                      <div className="space-y-2 text-center">
                        <h3 className="text-xl font-bold">Welcome Back</h3>
                        <p className="text-sm text-muted-foreground">Enter your credentials to sign in</p>
                      </div>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-primary/70 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  InstaHire provides everything you need to connect and work securely
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[
                {
                  title: "Secure Escrow Payments",
                  description: "Funds are held securely until work is completed and approved",
                },
                {
                  title: "Built-in Wallet",
                  description: "Manage your funds directly on the platform",
                },
                {
                  title: "Simple Job Posting",
                  description: "Post jobs and find contractors quickly",
                },
                {
                  title: "Streamlined Applications",
                  description: "Apply with one click using your pre-filled profile",
                },
                {
                  title: "Contractor Profiles",
                  description: "Showcase your skills and experience to potential clients",
                },
                {
                  title: "Project Management",
                  description: "Track progress and manage contracts in one place",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-4 bg-white dark:bg-gray-950"
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-white dark:bg-gray-950">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} InstaHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
