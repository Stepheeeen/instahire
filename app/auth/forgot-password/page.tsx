import Link from "next/link"
import { ForgotPasswordForm } from "./forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="auth-card px-2">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>
      <ForgotPasswordForm />
      <div className="mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="auth-link">
          Sign in
        </Link>
      </div>
    </div>
  )
}
