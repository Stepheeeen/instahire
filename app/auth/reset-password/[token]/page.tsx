import Link from "next/link"
import { ResetPasswordForm } from "./reset-password-form"

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <div className="auth-card px-2">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="text-sm text-muted-foreground">Enter your new password below</p>
      </div>
      <ResetPasswordForm token={params.token} />
      <div className="mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="auth-link">
          Sign in
        </Link>
      </div>
    </div>
  )
}
