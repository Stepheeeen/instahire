"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import * as bcrypt from "bcryptjs"

// In a real app, this would be a database
const users: any[] = []
let resetTokens: { token: string; email: string; expires: Date }[] = []

// Mock user session
let sessions: { id: string; userId: string; expires: Date }[] = []

// Helper to hash passwords
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

// Helper to verify passwords
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Register a new user
export async function registerUser({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  // Check if user already exists
  if (users.some((user) => user.email === email)) {
    throw new Error("User with this email already exists")
  }

  // Hash the password
  const hashedPassword = await hashPassword(password)

  // Create a new user
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  }

  // Save the user
  users.push(newUser)

  return { success: true }
}

// Login a user
export async function loginUser({
  email,
  password,
  rememberMe = false,
}: {
  email: string
  password: string
  rememberMe?: boolean
}) {
  // Find the user
  const user = users.find((user) => user.email === email)
  if (!user) {
    throw new Error("Invalid email or password")
  }

  // Verify the password
  const isPasswordValid = await verifyPassword(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  // Create a session
  const sessionId = uuidv4()
  const expiresIn = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 30 days or 1 day
  const session = {
    id: sessionId,
    userId: user.id,
    expires: new Date(Date.now() + expiresIn),
  }

  // Save the session
  sessions.push(session)

  // Set a cookie
  cookies().set({
    name: "sessionId",
    value: sessionId,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresIn / 1000, // Convert to seconds
    sameSite: "lax",
  })

  return { success: true }
}

// Logout a user
export async function logoutUser() {
  // Get the session ID from the cookie
  const sessionId = cookies().get("sessionId")?.value

  if (sessionId) {
    // Remove the session
    sessions = sessions.filter((session) => session.id !== sessionId)

    // Delete the cookie
    cookies().delete("sessionId")
  }

  redirect("/auth/login")
}

// Get the current user session
export async function getUserSession() {
  // Get the session ID from the cookie
  const sessionId = cookies().get("sessionId")?.value

  if (!sessionId) {
    return null
  }

  // Find the session
  const session = sessions.find((session) => session.id === sessionId)

  if (!session || session.expires < new Date()) {
    // Session expired
    cookies().delete("sessionId")
    return null
  }

  // Find the user
  const user = users.find((user) => user.id === session.userId)

  if (!user) {
    return null
  }

  // Return user data (excluding password)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

// Request a password reset
export async function requestPasswordReset(email: string) {
  // Find the user
  const user = users.find((user) => user.email === email)

  if (!user) {
    // Don't reveal that the user doesn't exist for security reasons
    return { success: true }
  }

  // Generate a reset token
  const token = uuidv4()
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  // Save the token
  resetTokens.push({ token, email, expires })

  // In a real app, you would send an email with the reset link
  console.log(`Password reset link: /auth/reset-password/${token}`)

  return { success: true }
}

// Reset a password
export async function resetPassword({
  token,
  password,
}: {
  token: string
  password: string
}) {
  // Find the token
  const resetToken = resetTokens.find((t) => t.token === token)

  if (!resetToken || resetToken.expires < new Date()) {
    throw new Error("Invalid or expired token")
  }

  // Find the user
  const user = users.find((user) => user.email === resetToken.email)

  if (!user) {
    throw new Error("User not found")
  }

  // Hash the new password
  const hashedPassword = await hashPassword(password)

  // Update the user's password
  user.password = hashedPassword

  // Remove the token
  resetTokens = resetTokens.filter((t) => t.token !== token)

  return { success: true }
}
