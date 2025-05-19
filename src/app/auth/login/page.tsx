import Link from "next/link"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-muted-foreground">Enter your email and password to sign in to your account</p>
      </div>
      <LoginForm />
      <div className="text-center text-sm">
        <Link href="/auth/forgot-password" className="underline">
          Forgot your password?
        </Link>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}
