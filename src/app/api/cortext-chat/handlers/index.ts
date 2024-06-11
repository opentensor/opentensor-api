export interface Message {
  role: string
  content: string
}

export async function postChat(requestData: {
  messages: Array<Message>
  temperature: number
  model: string
  max_tokens: number
  stream: boolean
  top_p: number
}) {
  const response = await fetch(`${process.env.CORCEL_URL}/v1/text/cortext/chat`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.CORCEL_API_KEY!
    }),
    body: JSON.stringify({
      messages: requestData.messages,
      temperature: requestData.temperature,
      model: requestData.model,
      max_tokens: requestData.max_tokens,
      stream: requestData.stream,
      top_p: requestData.top_p
    })
  })

  if (!response.ok) {
    throw new Error('Failed: ' + response.status + ' ' + response.statusText)
  }

  return response.body
}
