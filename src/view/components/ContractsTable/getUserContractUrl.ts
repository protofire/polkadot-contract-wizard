import { DOMAIN, ROUTES } from '@/constants'
import { UserContractDetails } from '@/domain'

export function getUserContractUrl(userContract: UserContractDetails) {
  return `${DOMAIN}${ROUTES.CONTRACTDETAIL}?uuid=${userContract.uuid}`
}
