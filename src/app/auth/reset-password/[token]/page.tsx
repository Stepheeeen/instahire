import Link from "next/link"
import { ResetPasswordForm } from "./reset-password-form"

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset password</h1>
        <p className="text-muted-foreground">Enter your new password below</p>
      </div>
      <ResetPasswordForm token={params.token} />
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
