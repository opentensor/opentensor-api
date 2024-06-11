export interface JobRawScriptRequest {
  raw_script?: string
  input_url?: string
  tag?: string
}

export async function postJobRawScript(requestData: JobRawScriptRequest) {
  const response = await fetch(`${process.env.COMPUTE_HORDE_URL}/api/v1/job-raw/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.COMPUTE_HORDE_API_KEY}`
    }),
    body: JSON.stringify({
      raw_script: requestData.raw_script,
      input_url: requestData.input_url,
      tag: requestData.tag
    })
  })

  if (response.ok) {
    const data = await response.json()

    return data
  } else {
    throw new Error('Failed to create job: ' + response.status + ' ' + response.statusText)
  }
}
