export interface userJob {
  email: string
  jobId: string
  createdAt: Date
}

export async function getJobs(userJobs: userJob[], page?: string | null) {
  let uuidParameter: Array<string> = []

  userJobs.map((userJob) => {
    uuidParameter.push(`uuid=${userJob.jobId}`)
  })

  const response = await fetch(`${process.env.COMPUTE_HORDE_URL}/api/v1/jobs?page=${page ?? 1}&` + uuidParameter.join('&'), {
    method: 'GET',
    headers: new Headers({
      Authorization: `Token ${process.env.COMPUTE_HORDE_API_KEY}`
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Failed to retrieve data: ' + response.status + ' ' + response.statusText)
  }
}
