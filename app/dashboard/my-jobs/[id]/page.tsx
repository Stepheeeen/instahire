import { JobManagementView } from "./job-management-view"

export default async function JobManagementPage() {
  const job = { id: "1", title: "Sample Job" }; // Replace with actual job data
  const contractors = [{ id: "1", name: "Contractor A" }]; // Replace with actual contractors data
  const user = { id: "123", name: "User A" }; // Replace with actual user data

  return (
    <div className="container py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <JobManagementView job={job} contractors={contractors} userId={user.id} />
      </div>
    </div>
  )
}
