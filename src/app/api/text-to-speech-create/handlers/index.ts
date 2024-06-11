export interface textToSpeechCreateRequest {
  text: string
  hf_repo: string
  speed: number
}

export async function postTextToSpeechCreate(requestData: textToSpeechCreateRequest) {
  const response = await fetch(`${process.env.MY_SHELL_URL}/run`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MY_SHELL_API_TOKEN}`
    }),
    body: JSON.stringify({
      text: requestData.text,
      hf_repo: requestData.hf_repo,
      speed: requestData.speed
    })
  })

  if (response.ok) {
    const result = await response.json()

    return result
  } else {
    throw new Error('Failed to create job: ' + response.status + ' ' + response.statusText)
  }
}
