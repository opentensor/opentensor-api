export interface textToSpeechRetrieveRequest {
  task_id: string
}

export async function postTextToSpeechRetrieveResult(requestData: textToSpeechRetrieveRequest) {
  const response = await fetch(`${process.env.MY_SHELL_URL}/get_result`, {
    method: 'POST',
    body: JSON.stringify({
      task_id: requestData.task_id
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MY_SHELL_API_TOKEN}`
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Failed to retrieve speech: ' + response.status + ' ' + response.statusText)
  }
}
