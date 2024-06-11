export interface AITextDetectionBatchRequest {
  texts: Array<string>
  api_key: string
}

export async function postAITextDetectionBatchQuery(requestData: AITextDetectionBatchRequest) {
  const response = await fetch(`${process.env.ITS_AI_URL}/api/batch/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ texts: requestData.texts, api_key: requestData.api_key })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to query: ' + response.status + ' ' + response.statusText)
  }
}
