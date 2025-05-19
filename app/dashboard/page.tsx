import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUserSession, logoutUser } from "@/app/actions/auth-actions"

export default async function DashboardPage() {
  // In a real app, this would check the user's session
  const user = await getUserSession()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <div className="flex items-center justify-center">
          <span className="font-bold text-xl">Auth System</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <span className="text-sm font-medium">Welcome, {user.name}</span>
          <form action={logoutUser}>
            <Button variant="ghost" size="sm" type="submit">
              Logout
            </Button>
          </form>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p>Welcome to your dashboard. You are now authenticated!</p>
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Auth System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
