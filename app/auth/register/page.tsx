import Link from "next/link"
import { RegisterForm } from "./register-form"

export default function RegisterPage() {
  return (
    <div className="auth-card px-2">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your information to get started</p>
      </div>
      <RegisterForm />
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="auth-link">
          Sign in
        </Link>
      </div>
    </div>
  )
}
