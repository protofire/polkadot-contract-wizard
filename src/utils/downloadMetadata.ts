import { takeFirstChars } from './formatString'

export const downloadJson = (json: string, filename: string) => {
  const jsonString = JSON.stringify(json)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const downloadMetadata = (codeId: string, sourceMetadata: string) => {
  const filename = `${takeFirstChars(codeId)}_metadata.json`

  downloadJson(sourceMetadata, filename)
}
