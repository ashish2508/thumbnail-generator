import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

const users = [
  {
    id: "1",
    email: "user@example.com",
    passwordHash: "$2b$10$CwTycUXWue0Thq9StjUM0uJ8zLzXtT45JHC1e0kCshjIVw6QKZ8uK", // bcrypt hash for "password123"
  },
]

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
  }

  const user = users.find((u) => u.email === email)

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash)

  if (!passwordValid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  })

  return NextResponse.json({ token })
}

