import type React from "react"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="auth-container">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">Auth System</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <footer className="py-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Auth System. All rights reserved.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
