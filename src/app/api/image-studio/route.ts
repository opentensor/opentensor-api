import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/database'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  let result = await prisma.imageStudio.findMany({
    where: { user_id: user.id }
  })

  return NextResponse.json({ success: true, result }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { imgStr, appTag } = (await request.json()) as {
    imgStr: string
    appTag: string
  }

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const result = await prisma.imageStudio.create({
    data: {
      app_tag: appTag,
      img_str: imgStr,
      user_id: user.id
    }
  })

  return NextResponse.json({ success: true, result }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { id } = (await request.json()) as {
    id: string
  }

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const res = await prisma.imageStudio.delete({
    where: {
      id,
      user_id: user.id
    }
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
