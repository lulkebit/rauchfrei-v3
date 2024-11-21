import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Benutzer nicht gefunden' },
        { status: 404 }
      )
    }

    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Ungültiges Passwort' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json(
      { error: 'Login fehlgeschlagen' },
      { status: 500 }
    )
  }
} 