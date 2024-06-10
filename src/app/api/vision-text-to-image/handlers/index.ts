export interface Prompt {
  text: string
}

export async function postTextToImage(requestData: {
  text_prompts: Array<Prompt>
  height: number
  width: number
  engine: string
  steps: number
  cfg_scale: number
}) {
  const response = await fetch(`${process.env.VISION_URL_OTF_VALIDATOR}/text-to-image`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.VISION_KEY_OTF_VALIDATOR!
    }),
    body: JSON.stringify({
      text_prompts: requestData.text_prompts,
      height: requestData.height,
      width: requestData.width,
      engine: requestData.engine,
      steps: requestData.steps,
      cfg_scale: requestData.cfg_scale
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
