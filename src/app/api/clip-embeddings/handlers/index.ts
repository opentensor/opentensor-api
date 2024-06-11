export async function postClipEmbeddings(requestData: { image_b64s: Array<string> }) {
  const response = await fetch(`${process.env.VISION_URL_OTF_VALIDATOR}/clip-embeddings`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: process.env.VISION_KEY_OTF_VALIDATOR!
    }),
    body: JSON.stringify({
      image_b64s: requestData.image_b64s
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to retrieve image: ' + response.status + ' ' + response.statusText)
  }
}
