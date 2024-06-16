import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/database'

import { hashApiKey } from '../../../../_utils/apiKey'
import { getJobs } from './handlers'

export async function GET(request: NextRequest) {
  const headers = new Headers(request.headers)
  const xApiKey = headers.get('X-API-KEY')
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')

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
    let userJobs = await prisma.computeJobs.findMany({
      where: { email: user.email ?? '' }
    })

    const res = await getJobs(userJobs, page)

    await prisma.apiKey.update({
      where: {
        id: apiKey.id
      },
      data: {
        usage: apiKey.usage + 1
      }
    })

    return NextResponse.json({ res }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
