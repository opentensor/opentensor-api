import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/database'

export async function POST(request: NextRequest) {
  const { email, name, message } = (await request.json()) as {
    name: string
    email: string
    message: string
  }

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, error: 'Missing field' }, { status: 401 })
  }

  const result = await prisma.contactForm.create({
    data: {
      name,
      email,
      message
    }
  })

  return NextResponse.json({ success: true, data: result }, { status: 200 })
}
