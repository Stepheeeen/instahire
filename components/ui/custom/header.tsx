'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header({ user }: { user: { userType: string } }) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold text-xl text-primary">InstaHire</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          {user.userType === "project-owner" ? (
            <>
              <Link href="/dashboard/post-job" className="text-sm font-medium hover:text-primary">
                Post Job
              </Link>
              <Link href="/dashboard/my-jobs" className="text-sm font-medium hover:text-primary">
                My Jobs
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/find-jobs" className="text-sm font-medium hover:text-primary">
                Find Jobs
              </Link>
              <Link href="/dashboard/applications" className="text-sm font-medium hover:text-primary">
                My Applications
              </Link>
            </>
          )}
          <Link href="/dashboard/profile" className="text-sm font-medium hover:text-primary">
            Profile
          </Link>
          <form>
            <Button variant="outline" size="sm" type="submit">
              Logout
            </Button>
          </form>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
                {user.userType === "project-owner" ? (
                  <>
                    <Link href="/dashboard/post-job" className="text-sm font-medium hover:text-primary">
                      Post Job
                    </Link>
                    <Link href="/dashboard/my-jobs" className="text-sm font-medium hover:text-primary">
                      My Jobs
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard/find-jobs" className="text-sm font-medium hover:text-primary">
                      Find Jobs
                    </Link>
                    <Link href="/dashboard/applications" className="text-sm font-medium hover:text-primary">
                      My Applications
                    </Link>
                  </>
                )}
                <Link href="/dashboard/profile" className="text-sm font-medium hover:text-primary">
                  Profile
                </Link>
                <form>
                  <Button variant="outline" size="sm" type="submit" className="w-full">
                    Logout
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
