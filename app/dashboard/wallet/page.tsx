import { redirect } from "next/navigation"
import { WalletFundForm } from "./wallet-fund-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function WalletPage() {
  // Mock wallet data (replace with actual API call or data fetching logic)
  const wallet = {
    balance: 1234.56, // Example balance
    address: "0x1234567890abcdef1234567890abcdef12345678", // Example address
  };

  // Mock user data (replace with actual user fetching logic)
  const user = {
    userType: "project-owner", // Example user type
    id: "user123", // Example user ID
  };

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Wallet</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Your current balance in USDC</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{wallet?.balance.toFixed(2)} USDC</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wallet Address</CardTitle>
              <CardDescription>Your unique wallet address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md break-all font-mono text-sm">
                {wallet?.address}
              </div>
            </CardContent>
          </Card>
        </div>

        {user.userType === "project-owner" && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Fund Your Wallet</CardTitle>
                <CardDescription>Add funds to your wallet to post jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <WalletFundForm userId={user.id} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
