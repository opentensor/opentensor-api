export interface JobDockerRequest {
  docker_image?: string
  args?: string
  env?: any
  use_gpu?: boolean
  input_url?: string
  tag?: string
}

export async function postJobDocker(requestData: JobDockerRequest) {
  const response = await fetch(`${process.env.COMPUTE_HORDE_URL}/api/v1/job-docker/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.COMPUTE_HORDE_API_KEY}`
    }),
    body: JSON.stringify({
      docker_image: requestData.docker_image,
      args: requestData.args,
      env: requestData.env,
      use_gpu: requestData.use_gpu,
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
