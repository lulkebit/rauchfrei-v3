import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })

    return NextResponse.json({ message: 'Benutzer erstellt' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Registrierung fehlgeschlagen' },
      { status: 500 }
    )
  }
} 