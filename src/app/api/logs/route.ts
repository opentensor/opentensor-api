import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { decryptApiKey } from '@/_utils/apiKey'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/database'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  let apiKeys = await prisma.apiKey.findMany({ where: { user_id: user.id } })
  // Extract key hashed values
  const keyHashes = apiKeys.map((apiKey) => apiKey.key_hashed)

  // Find logs where key_hashed is in the array
  let apiLogs = await prisma.apiLog.findMany({
    where: { key_hashed: { in: keyHashes } },
    orderBy: {
      created_at: 'desc'
    },
    take: 10
  })


  return NextResponse.json({ success: true, data: apiLogs }, { status: 200 })
}
