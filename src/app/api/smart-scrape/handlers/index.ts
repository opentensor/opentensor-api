export async function getDataFromSmartScrape(query: string, tools: string[]) {
  const response = await fetch(`${process.env.DATURA_URL}/search?tools=${tools.join(',')}&query=${query}`, {
    method: 'GET'
  })

  if (response.ok) {
    const data = await response.json()

    return data
  } else {
    throw new Error('Failed: ' + response.status + ' ' + response.statusText)
  }
}
