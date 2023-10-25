import {
  UserContractDetails,
  UserContractDetailsDraft
} from '@/domain/UserContractDetails'
import { DeploymentRaw } from '@/services/backendApi/ApiDeploymentRepository'
import { parseJsonToRecord } from '@/utils/json'

function _isExternal(
  abi: UserContractDetails['abi'],
  type: UserContractDetails['type']
) {
  return abi !== undefined && type === 'custom'
}

export function deploymentItemToUserContractDetails(
  item: UserContractDetailsDraft,
  uuid: UserContractDetails['uuid']
): UserContractDetails {
  return {
    ...item,
    uuid,
    external: _isExternal(item.abi, item.type)
  }
}

export function deploymentRawToUserContractDetails(
  deploymentRaw: DeploymentRaw
): UserContractDetails {
  const abi = deploymentRaw.external_abi
    ? parseJsonToRecord(deploymentRaw.external_abi)
    : undefined
  return {
    uuid: deploymentRaw._id['$oid'],
    userAddress: deploymentRaw.user_address,
    network: deploymentRaw.network,
    address: deploymentRaw.contract_address,
    txHash: deploymentRaw.tx_hash,
    codeId: deploymentRaw.code_id,
    type: deploymentRaw.contract_type,
    name: deploymentRaw.contract_name,
    date: deploymentRaw.date,
    abi: abi,
    external: _isExternal(abi, deploymentRaw.contract_type),
    hidden: deploymentRaw.hidden
  }
}
