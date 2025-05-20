import { redirect } from "next/navigation"
import { getUserSession, getJobById } from "@/app/actions/auth-actions"
import { JobDetailView } from "./job-detail-view"

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const user = await getUserSession()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.userType !== "contractor") {
    redirect("/dashboard")
  }

  const job = await getJobById(params.id)

  if (!job) {
    redirect("/dashboard/find-jobs")
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <JobDetailView job={job} userId={user.id} />
      </div>
    </div>
  )
}
