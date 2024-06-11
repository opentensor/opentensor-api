export interface Prompt {
  text: string
}

export async function postTextToImage(requestData: {
  messages: string
  quality: string
  size: string
  provider: string
  steps: number
  cfg_scale: number
  style: string
}) {
  const response = await fetch(`${process.env.CORCEL_URL}/v1/image/cortext/text-to-image`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.CORCEL_API_KEY!
    }),
    body: JSON.stringify({
      messages: requestData.messages,
      quality: requestData.quality,
      size: requestData.size,
      provider: requestData.provider,
      steps: requestData.steps,
      cfg_scale: requestData.cfg_scale,
      style: requestData.style
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
