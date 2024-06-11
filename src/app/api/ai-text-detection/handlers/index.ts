export interface AITextDetectionRequest {
  text: string
  api_key: string
}

export async function postAITextDetectionQuery(requestData: AITextDetectionRequest) {
  const response = await fetch(`${process.env.ITS_AI_URL}/api/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: requestData.text, api_key: requestData.api_key })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to query: ' + response.status + ' ' + response.statusText)
  }
}
