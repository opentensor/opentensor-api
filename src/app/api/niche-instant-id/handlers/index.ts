export interface InstantIDRequest {
  prompt: string
  model_name: string
  seed: number
  conditional_image: string
}

export async function postInstantID(requestData: InstantIDRequest) {
  const response = await fetch(`${process.env.NICHE_URL_OTF_VALIDATOR}/api/v1/instantid`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      API_KEY: process.env.NICHE_API_KEY!
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
    throw new Error('Failed: ' + response.status + ' ' + response.statusText)
  }
}
