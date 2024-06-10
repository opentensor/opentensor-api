export async function postTextQuery(requestData: { network: string; user_id: string; prompt: string }) {
  const response = await fetch(`${process.env.BC_INSIGHTS_URL}/api/text_query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ network: requestData.network, user_id: requestData.user_id, prompt: requestData.prompt })
  })

  if (response.ok) {
    const result = await response.json()
    return result
  } else {
    throw new Error('Failed to query: ' + response.status + ' ' + response.statusText)
  }
}
