import { UserContractDetails } from '@/domain/UserContractDetails'

export type UserContractTableItem = UserContractDetails & {
  isDownloading?: boolean
}
