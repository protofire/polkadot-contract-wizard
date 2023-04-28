import { Contract, isContractDeployed } from '@/domain'

const downloadJson = (json: any, filename: string) => {
  const jsonString = JSON.stringify(json)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const downloadMetadata = (codeId: string) => {
  // TODO: Fetch the contract metadata from backend
  // TODO: Remove the hardcoded metadata
  const json = { code_id: codeId }

  downloadJson(json, 'metadata.json')
}
