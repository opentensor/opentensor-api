import { TextPrompt } from '../type'

export async function postImageToImage(requestData: {
  text_prompts: TextPrompt[]
  height: number
  width: number
  engine: string
  steps: number
  cfg_scale: number
  init_image: string
  image_strength: number
}) {
  const response = await fetch(`${process.env.VISION_URL_OTF_VALIDATOR}/image-to-image`, {
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
      cfg_scale: requestData.cfg_scale,
      init_image: requestData.init_image,
      image_strength: requestData.image_strength
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
