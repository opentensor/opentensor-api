import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/database'

import { decryptApiKey, encryptApiKey, generateApiKeys } from '../../../_utils/apiKey'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { name } = (await request.json()) as {
    name: string
  }

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const apiKeysCount = await prisma.apiKey.count({ where: { user_id: user.id } })

  if (apiKeysCount >= 2) {
    return NextResponse.json({ success: false, error: 'API Keys limit reached for free tier.' }, { status: 402 })
  }

  const apiKeyObj = generateApiKeys()
  const encryptedKey = encryptApiKey(apiKeyObj.apiKey)

  const apiKey = await prisma.apiKey.create({
    data: {
      name,
      key: encryptedKey.encKey,
      iv: encryptedKey.iv,
      key_tag: encryptedKey.tag,
      key_hashed: apiKeyObj.apiKeyHash,
      user_id: user.id
    }
  })

  apiKey.key = apiKeyObj.apiKey
  return NextResponse.json({ success: true, data: apiKey }, { status: 200 })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  let apiKeys = await prisma.apiKey.findMany({ where: { user_id: user.id } })

  apiKeys = apiKeys.map((apiKey) => {
    const decrypted = decryptApiKey(apiKey.key, apiKey.iv, apiKey.key_tag)
    apiKey.key = decrypted

    return apiKey
  })

  return NextResponse.json({ success: true, data: apiKeys }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { id } = (await request.json()) as {
    id: string
  }

  const user = await prisma.user.findUnique({ where: { email: String(session.user.email) } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const apiKey = await prisma.apiKey.delete({
    where: {
      id,
      user_id: user.id
    }
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
