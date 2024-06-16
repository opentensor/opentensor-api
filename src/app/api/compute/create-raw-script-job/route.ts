import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/database'

import { hashApiKey } from '../../../../_utils/apiKey'
import { JobRawScriptRequest, postJobRawScript } from './handlers'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  const data = (await request.json()) as JobRawScriptRequest
  const headers = new Headers(request.headers)
  const xApiKey = headers.get('X-API-KEY')

  if (!xApiKey) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const hashedApiKey = hashApiKey(xApiKey)

  const apiKey = await prisma.apiKey.findUnique({
    where: {
      key_hashed: hashedApiKey
    }
  })

  if (!apiKey) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: apiKey.user_id } })

  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  if (apiKey.usage >= apiKey.max_usage_limit)
    return NextResponse.json({ success: false, error: 'API Key Limit Exceeded' }, { status: 402 })

  try {
    const result = await postJobRawScript(data)

    await prisma.computeJobs.create({
      data: {
        email: user.email ?? '',
        createdAt: result.created_at,
        jobId: result.uuid
      }
    })

    await prisma.apiKey.update({
      where: {
        id: apiKey.id
      },
      data: {
        usage: apiKey.usage + 1
      }
    })

    await prisma.apiLog.create({
      data: {
        key_name: apiKey.name,
        key_hashed: hashedApiKey,
        endpoint: request.nextUrl.pathname,
        status: 200,
        ip: request.ip
      }
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    await prisma.apiLog.create({
      data: {
        key_name: apiKey.name,
        key_hashed: hashedApiKey,
        endpoint: request.nextUrl.pathname,
        status: 500
      }
    })

    return NextResponse.json(
      { success: false, error: error?.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
