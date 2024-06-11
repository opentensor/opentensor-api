export interface TextToImageRequest {
  prompt: string
  model_name: string
  seed: number
  aspect_ratio: string
}

export async function postTextToImage(requestData: TextToImageRequest) {
  const response = await fetch(`${process.env.NICHE_URL_OTF_VALIDATOR}/api/v1/txt2img`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      API_KEY: process.env.NICHE_API_KEY!
    }),
    body: JSON.stringify({
      prompt: requestData.prompt,
      model_name: requestData.model_name,
      seed: requestData.seed,
      aspect_ratio: requestData.aspect_ratio
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
