export interface Prompt {
  text: string
  weight: 0
}

export async function postAvatar(requestData: {
  text_prompts: Array<Prompt>
  ipadapter_strength: number
  steps: number
  height: number
  width: number
  init_image: string
  control_strength: number
}) {
  const response = await fetch(`${process.env.VISION_URL_OTF_VALIDATOR}/avatar`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.VISION_KEY_OTF_VALIDATOR!
    }),
    body: JSON.stringify({
      text_prompts: requestData.text_prompts,
      height: requestData.height,
      width: requestData.width,
      ipadapter_strength: requestData.ipadapter_strength,
      steps: requestData.steps,
      init_image: requestData.init_image,
      control_strength: requestData.control_strength
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
