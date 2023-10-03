import { UserContractDetails } from '@/domain/UserContractDetails'

export type ContractTableItem = UserContractDetails & {
  sourceJsonString?: string
  isDownloading?: boolean
}
