import { redirect } from "next/navigation"
import { getUserSession, getUserProfile } from "@/app/actions/auth-actions"
import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
  const user = await getUserSession()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getUserProfile(user.id)

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  )
}
