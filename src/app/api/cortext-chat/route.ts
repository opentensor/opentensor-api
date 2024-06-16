import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/database'

import { hashApiKey } from '../../../_utils/apiKey'
import { Message, postChat } from './handlers'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  const data = (await request.json()) as {
    messages: Array<Message>
    temperature: number
    model: string
    max_tokens: number
    stream: boolean
    top_p: number
  }
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

  if (apiKey.usage >= apiKey.max_usage_limit)
    return NextResponse.json({ success: false, error: 'API Key Limit Exceeded' }, { status: 402 })

  try {
    const stream = await postChat(data)
    // Set up headers for a chunked response
    const headers = new Headers({
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Transfer-Encoding': 'chunked'
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

    // Respond with the transformed stream
    return new NextResponse(stream, { status: 200, headers })
  } catch (error: any) {
    await prisma.apiLog.create({
      data: {
        key_name: apiKey.name,
        key_hashed: hashedApiKey,
        endpoint: request.nextUrl.pathname,
        status: 500,
        ip: request.ip
      }
    })

    return NextResponse.json(
      { success: false, error: error?.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
