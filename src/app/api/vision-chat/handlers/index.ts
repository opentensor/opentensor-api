export interface Message {
  role: string
  content: string
}

export async function postChat(requestData: {
  messages: Array<Message>
  temperature: number
  model: string
  max_tokens: number
}) {
  const response = await fetch(`${process.env.VISION_URL_OTF_VALIDATOR}/chat`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.VISION_KEY_OTF_VALIDATOR!
    }),
    body: JSON.stringify({
      messages: requestData.messages,
      temperature: requestData.temperature,
      model: requestData.model,
      max_tokens: requestData.max_tokens
    })
  })

  if (!response.ok) {
    throw new Error('Failed: ' + response.status + ' ' + response.statusText)
  }

  return response.body
}
