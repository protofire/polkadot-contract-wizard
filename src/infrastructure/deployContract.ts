import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import type { ISubmittableResult } from '@polkadot/types/types'

import { ApiPromise } from '@polkadot/api'

export interface DeployContractService {
  contractAddress: string
  txHash: string
}

type DeployContractParams = {
  tx: SubmittableExtrinsic<'promise', ISubmittableResult>
  api: ApiPromise
  currentAccount: string
}

export async function deployContractService({
  tx,
  api,
  currentAccount
}: DeployContractParams): Promise<DeployContractService> {
  return new Promise<DeployContractService>(async (resolve, reject) => {
    await web3Enable(currentAccount)
    const injector = await web3FromAddress(currentAccount)
    const unsub = await tx.signAndSend(
      currentAccount,
      {
        signer: injector.signer
      },
      ({ status, events, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = api.registry.findMetaError(dispatchError.asModule)
            const { docs, name, section } = decoded

            return reject(`${section}.${name}: ${docs.join(' ')}`)
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            return reject(dispatchError.toString())
          }
        }

        if (status.isInBlock || status.isFinalized) {
          let txHash = ''
          let contractAddress = ''

          events
            .filter(({ event }) => api.events.contracts.CodeStored.is(event))
            .forEach(
              ({
                event: {
                  data: [code_hash]
                }
              }) => {
                console.info(`code hash: ${code_hash}`)
                txHash = code_hash.toString()
              }
            )
          events
            .filter(({ event }) => api.events.contracts.Instantiated.is(event))
            .forEach(
              ({
                event: {
                  data: [deployer, contract]
                }
              }) => {
                console.info(`contract address: ${contract}`)
                contractAddress = contract.toString()
              }
            )

          unsub()
          return resolve({
            txHash,
            contractAddress
          })
        }
      }
    )
  })
}
