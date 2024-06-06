export async function getAllApiKeysOfUser() {
  const res = await fetch('/api/generate-key')
  const data = await res.json()

  return data
}

export async function createNewApiKey(name: string) {
  const res = await fetch('/api/generate-key', {
    method: 'POST',
    body: JSON.stringify({
      name
    })
  })

  const data = await res.json()

  return data
}

export async function deleteKey(id: string) {
  const res = await fetch('/api/generate-key', {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  })

  const data = await res.json()

  return data
}

export async function getAllApiLogsOfUser() {
  const res = await fetch('/api/logs')
  const data = await res.json()

  return data
}
