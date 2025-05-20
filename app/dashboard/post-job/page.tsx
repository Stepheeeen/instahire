import { redirect } from "next/navigation"
import { getUserSession, getUserWallet } from "@/app/actions/auth-actions"
import { PostJobForm } from "./post-job-form"

export default async function PostJobPage() {
  const user = await getUserSession()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.userType !== "project-owner") {
    redirect("/dashboard")
  }

  const wallet = await getUserWallet(user.id)

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Post a New Job</h1>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            Wallet Balance: {wallet?.balance.toFixed(2)} USDC
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
          <PostJobForm userId={user.id} />
        </div>
      </div>
    </div>
  )
}
