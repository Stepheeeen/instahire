import Header from "@/components/ui/custom/header";
import { PostJobForm } from "./post-job-form"

export default async function PostJobPage() {
  const wallet = { balance: 100 }; // Example wallet object
  const user = { id: "123", name: 'John Doe', userType: 'project-owner' }; // Example user object
  return (
    <>
     <Header user={user}/>
    <div className="container py-10 px-2">
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
    </>
  )
}
