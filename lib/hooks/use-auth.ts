"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserSession } from "@/app/actions/auth-actions"

export function useAuth({ required = false, redirectTo = "/auth/login" } = {}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUserSession()

        if (userData) {
          setUser(userData)
        } else if (required) {
          router.push(redirectTo)
        }
      } catch (error) {
        console.error("Failed to load user session:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [required, redirectTo, router])

  return { user, loading }
}
