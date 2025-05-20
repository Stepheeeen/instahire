import { redirect } from "next/navigation"
import { getUserSession, getJobById, getJobContractors } from "@/app/actions/auth-actions"
import { JobManagementView } from "./job-management-view"

export default async function JobManagementPage({ params }: { params: { id: string } }) {
  const user = await getUserSession()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.userType !== "project-owner") {
    redirect("/dashboard")
  }

  const job = await getJobById(params.id)

  if (!job || job.ownerId !== user.id) {
    redirect("/dashboard/my-jobs")
  }

  const contractors = await getJobContractors(params.id)

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <JobManagementView job={job} contractors={contractors} userId={user.id} />
      </div>
    </div>
  )
}
