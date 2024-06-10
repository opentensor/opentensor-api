export interface Prompt {
  text: string
}

export async function postInpaint(requestData: {
  text_prompts: Array<Prompt>
  mask_image: string
  engine: string
  steps: number
  cfg_scale: number
  init_image: string
}) {
  const response = await fetch(`${process.env.VISION_URL_OTF_VALIDATOR}/inpaint`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.VISION_KEY_OTF_VALIDATOR!
    }),
    body: JSON.stringify({
      text_prompts: requestData.text_prompts,
      mask_image: requestData.mask_image,
      engine: requestData.engine,
      steps: requestData.steps,
      cfg_scale: requestData.cfg_scale,
      init_image: requestData.init_image
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retreive image: ' + response.status + ' ' + response.statusText)
  }
}
