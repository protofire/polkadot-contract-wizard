import { UserContractDetailsDraft } from '@/domain'
import { DeploymentRaw } from '../backendApi/ApiDeploymentRepository'

type DeploymentRawDraft = Omit<DeploymentRaw, '_id'>

export function fromDeploymentItemToRaw(
  deployment: UserContractDetailsDraft
): DeploymentRawDraft {
  return {
    contract_name: deployment.name,
    contract_address: deployment.address,
    network: deployment.network,
    code_id: deployment.codeId,
    user_address: deployment.userAddress,
    tx_hash: deployment.txHash,
    date: deployment.date,
    contract_type: deployment.type,
    hidden: deployment.hidden,
    ...(deployment.abi && {
      external_abi: deployment.abi
    })
  }
}
