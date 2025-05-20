import Header from "@/components/ui/custom/header"
import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
  // Simulate fetching user data
  const user = { id: "123", name: "John Doe", email: "johndoe@example.com", userType: "project-owner", }

  // Simulate profile data
  const profile = { id: user.id, name: user.name, email: user.email }

  return (
    <>
      <Header user={user} />
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
            <ProfileForm profile={profile} />
          </div>
        </div>
      </div>
    </>
  )
}
