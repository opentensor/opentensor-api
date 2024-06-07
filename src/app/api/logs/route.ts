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

  //TODO:may not need this
  // apiLogs = apiLogs.map((apiLog) => {
  //   apiKeys.map((apiKey) => {
  //     if (apiKey.key_hashed === apiLog.key_hashed) {
  //       const decrypted = decryptApiKey(apiKey.key, apiKey.iv, apiKey.key_tag)
  //       // key is not a field in the ApiLog table in the DB so the next line throws a Typescript error

  //       apiLog.key = decrypted ?? ''
  //     }
  //   })
  //   return apiLog
  // })

  return NextResponse.json({ success: true, data: apiLogs }, { status: 200 })
}
