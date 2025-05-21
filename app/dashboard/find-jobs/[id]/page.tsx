import { redirect } from "next/navigation"
import { JobDetailView } from "./job-detail-view"

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const jobId = params.id
  const user = { id: "123", name: "User A" } // Replace with actual user data
  const job = { id: jobId, title: "Sample Job", description: "Job Description" } // Replace with actual job data

  return (
    <div className="container py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <JobDetailView job={job} userId={user.id} />
      </div>
    </div>
  )
}
