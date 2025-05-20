"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import * as bcrypt from "bcryptjs"

// Update the users array to include user type and wallet
const users: any[] = []

// Add job listings array
const jobListings: any[] = []

// Add applications array
const applications: any[] = []

// Add escrow transactions array
const escrowTransactions: any[] = []

// Mock user session
let sessions: { id: string; userId: string; expires: Date }[] = []
let resetTokens: { token: string; email: string; expires: Date }[] = []

// Helper to hash passwords
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

// Helper to verify passwords
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Helper to generate a simple wallet address (in a real app, this would use a proper crypto library)
function generateWalletAddress(): string {
  return "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
}

// Register a new user
export async function registerUser({
  name,
  email,
  password,
  userType,
  country,
  bio,
}: {
  name: string
  email: string
  password: string
  userType: "contractor" | "project-owner"
  country?: string
  bio?: string
}) {
  // Check if user already exists
  if (users.some((user) => user.email === email)) {
    throw new Error("User with this email already exists")
  }

  // Hash the password
  const hashedPassword = await hashPassword(password)

  // Generate wallet address
  const walletAddress = generateWalletAddress()

  // Create a new user
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    userType,
    country,
    bio,
    wallet: {
      address: walletAddress,
      balance: 0, // In USDC
    },
    profile: {
      avatar: null,
      skills: [],
      resume: null,
      ratePerHour: userType === "contractor" ? 0 : null,
      domainName: userType === "project-owner" ? null : "",
    },
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

// Get user profile
export async function getUserProfile(userId: string) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    return null
  }

  // Return user data (excluding password)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    userType: user.userType,
    country: user.country,
    bio: user.bio,
    wallet: user.wallet,
    profile: user.profile,
  }
}

// Update user profile
export async function updateUserProfile(userId: string, profileData: any) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  // Update profile fields
  if (profileData.name) user.name = profileData.name
  if (profileData.country) user.country = profileData.country
  if (profileData.bio) user.bio = profileData.bio

  if (user.userType === "contractor") {
    if (profileData.skills) user.profile.skills = profileData.skills
    if (profileData.ratePerHour) user.profile.ratePerHour = profileData.ratePerHour
    if (profileData.resume) user.profile.resume = profileData.resume
  } else {
    if (profileData.domainName) user.profile.domainName = profileData.domainName
  }

  if (profileData.avatar) user.profile.avatar = profileData.avatar

  return { success: true }
}

// Fund wallet (only for project owners)
export async function fundWallet(userId: string, amount: number) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  if (user.userType !== "project-owner") {
    throw new Error("Only project owners can fund their wallet")
  }

  // In a real app, this would integrate with a payment processor
  user.wallet.balance += amount

  return { success: true, newBalance: user.wallet.balance }
}

// Post a job (only for project owners)
export async function postJob(
  userId: string,
  jobData: {
    title: string
    description: string
    budget: number
    skills: string[]
    deadline: Date
  },
) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  if (user.userType !== "project-owner") {
    throw new Error("Only project owners can post jobs")
  }

  // Check if user has enough balance
  if (user.wallet.balance < jobData.budget) {
    throw new Error("Insufficient balance to post this job")
  }

  const newJob = {
    id: uuidv4(),
    ownerId: userId,
    ownerName: user.name,
    title: jobData.title,
    description: jobData.description,
    budget: jobData.budget,
    skills: jobData.skills,
    deadline: jobData.deadline,
    status: "open", // open, in-progress, completed
    createdAt: new Date(),
    applications: [],
    contractorId: null,
  }

  jobListings.push(newJob)

  return { success: true, jobId: newJob.id }
}

// Get all jobs
export async function getAllJobs() {
  return jobListings.filter((job) => job.status === "open")
}

// Get job by ID
export async function getJobById(jobId: string) {
  return jobListings.find((job) => job.id === jobId)
}

// Get jobs by owner
export async function getJobsByOwner(ownerId: string) {
  return jobListings.filter((job) => job.ownerId === ownerId)
}

// Apply for a job (only for contractors)
export async function applyForJob(userId: string, jobId: string, proposedRate?: number) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  if (user.userType !== "contractor") {
    throw new Error("Only contractors can apply for jobs")
  }

  const job = jobListings.find((job) => job.id === jobId)

  if (!job) {
    throw new Error("Job not found")
  }

  if (job.status !== "open") {
    throw new Error("This job is no longer accepting applications")
  }

  // Check if already applied
  if (job.applications.some((app) => app.contractorId === userId)) {
    throw new Error("You have already applied for this job")
  }

  const application = {
    id: uuidv4(),
    jobId,
    contractorId: userId,
    contractorName: user.name,
    proposedRate: proposedRate || job.budget,
    status: "pending", // pending, accepted, rejected
    createdAt: new Date(),
  }

  job.applications.push(application)
  applications.push(application)

  return { success: true }
}

// Accept contractor (only for project owners)
export async function acceptContractor(userId: string, jobId: string, contractorId: string) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  if (user.userType !== "project-owner") {
    throw new Error("Only project owners can accept contractors")
  }

  const job = jobListings.find((job) => job.id === jobId)

  if (!job) {
    throw new Error("Job not found")
  }

  if (job.ownerId !== userId) {
    throw new Error("You don't own this job")
  }

  if (job.status !== "open") {
    throw new Error("This job is no longer open")
  }

  const application = job.applications.find((app) => app.contractorId === contractorId)

  if (!application) {
    throw new Error("Application not found")
  }

  // Check if owner has enough balance
  if (user.wallet.balance < application.proposedRate) {
    throw new Error("Insufficient balance to accept this contractor")
  }

  // Move funds to escrow
  user.wallet.balance -= application.proposedRate

  // Update job status
  job.status = "in-progress"
  job.contractorId = contractorId

  // Update application status
  application.status = "accepted"

  // Create escrow transaction
  const escrow = {
    id: uuidv4(),
    jobId,
    ownerId: userId,
    contractorId,
    amount: application.proposedRate,
    status: "locked", // locked, released
    createdAt: new Date(),
    ownerApproved: false,
    contractorApproved: false,
  }

  escrowTransactions.push(escrow)

  return { success: true }
}

// Mark work as complete (for both project owners and contractors)
export async function markWorkComplete(userId: string, jobId: string) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    throw new Error("User not found")
  }

  const job = jobListings.find((job) => job.id === jobId)

  if (!job) {
    throw new Error("Job not found")
  }

  if (job.status !== "in-progress") {
    throw new Error("This job is not in progress")
  }

  const escrow = escrowTransactions.find((e) => e.jobId === jobId)

  if (!escrow) {
    throw new Error("Escrow not found")
  }

  // Check if user is either the owner or the contractor
  if (user.id === job.ownerId) {
    escrow.ownerApproved = true
  } else if (user.id === job.contractorId) {
    escrow.contractorApproved = true
  } else {
    throw new Error("You are not associated with this job")
  }

  // If both approved, release funds
  if (escrow.ownerApproved && escrow.contractorApproved) {
    escrow.status = "released"
    job.status = "completed"

    // Transfer funds to contractor
    const contractor = users.find((u) => u.id === job.contractorId)
    if (contractor) {
      contractor.wallet.balance += escrow.amount
    }
  }

  return {
    success: true,
    ownerApproved: escrow.ownerApproved,
    contractorApproved: escrow.contractorApproved,
    completed: escrow.ownerApproved && escrow.contractorApproved,
  }
}

// Get user's wallet
export async function getUserWallet(userId: string) {
  const user = users.find((user) => user.id === userId)

  if (!user) {
    return null
  }

  return user.wallet
}

// Get user's applications (for contractors)
export async function getUserApplications(userId: string) {
  const user = users.find((user) => user.id === userId)

  if (!user || user.userType !== "contractor") {
    return []
  }

  return applications.filter((app) => app.contractorId === userId)
}

// Get contractors for a job
export async function getJobContractors(jobId: string) {
  const job = jobListings.find((job) => job.id === jobId)

  if (!job) {
    return []
  }

  return job.applications.map((app) => {
    const contractor = users.find((u) => u.id === app.contractorId)
    return {
      id: app.contractorId,
      name: contractor?.name || app.contractorName,
      proposedRate: app.proposedRate,
      status: app.status,
      appliedAt: app.createdAt,
    }
  })
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
