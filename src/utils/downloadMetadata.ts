export const downloadJson = (json: string, filename: string) => {
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const downloadMetadata = (suffix: string, sourceMetadata: string) => {
  const filename = `${suffix}_metadata.json`

  downloadJson(sourceMetadata, filename)
}
