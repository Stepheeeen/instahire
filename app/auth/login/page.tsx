import Link from "next/link"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="auth-card px-2">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials to sign in</p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center text-sm">
        <Link href="/auth/forgot-password" className="auth-link">
          Forgot your password?
        </Link>
      </div>
      <div className="mt-2 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="auth-link">
          Sign up
        </Link>
      </div>
    </div>
  )
}
