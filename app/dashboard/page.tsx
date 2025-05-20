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
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-xl text-primary">Auth System</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <span className="text-sm font-medium">Welcome, {user.name}</span>
            <form action={logoutUser}>
              <Button variant="outline" size="sm" type="submit">
                Logout
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Authenticated</div>
          </div>
          <p className="text-muted-foreground">Welcome to your dashboard. You are now authenticated!</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Name:</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Status:</span>
                  <span className="text-green-600 dark:text-green-400">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Security</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Manage your account security settings</p>
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Customize your account preferences</p>
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
            <h3 className="text-lg font-medium text-primary">Getting Started</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This is a secure dashboard page that is only accessible to authenticated users. You can customize this
              page to display user-specific content and functionality.
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Auth System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
