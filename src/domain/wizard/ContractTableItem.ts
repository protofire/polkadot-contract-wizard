import { Contract } from '@/domain/Contract'

export type ContractTableItem = Contract & {
  sourceJsonString?: string
  isDownloading?: boolean
}
