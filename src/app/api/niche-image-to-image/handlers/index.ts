export interface ImageToImageRequest {
  prompt: string
  model_name: string
  seed: number
  conditional_image: string
}

export async function postImageToImage(requestData: ImageToImageRequest) {
  const response = await fetch(`${process.env.NICHE_URL_OTF_VALIDATOR}/api/v1/img2img`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      API_KEY: process.env.NICHE_KEY_OTF_VALIDATOR!
    }),
    body: JSON.stringify({
      prompt: requestData.prompt,
      model_name: requestData.model_name,
      seed: requestData.seed,
      conditional_image: requestData.conditional_image
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
