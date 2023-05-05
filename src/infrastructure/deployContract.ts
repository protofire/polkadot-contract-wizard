import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import type { ISubmittableResult } from '@polkadot/types/types'
// import type { SignedBlock } from '@polkadot/types/interfaces/runtime'

import { ApiPromise } from '@polkadot/api'
import { reportError } from 'src/hooks/useReportError'
import { getErrorMessage } from '@/utils/error'

export interface DeployContractService {
  contractAddress: string
  txHash: number
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
    try {
      const unsub = await tx.signAndSend(
        currentAccount,
        {
          signer: injector.signer
        },
        async ({ status, events, dispatchError }) => {
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
            let contractAddress = ''

            // Determine block number
            const blockHash = status.asInBlock.toHex()
            const block = await api.rpc.chain.getBlock(blockHash)
            const blockNumber = block.block.header.number.toNumber()

            events
              .filter(({ event }) => api.events.contracts.CodeStored.is(event))
              .forEach(
                ({
                  event: {
                    data: [code_hash]
                  }
                }) => {
                  console.info(`code hash: ${code_hash}`)
                }
              )
            events
              .filter(({ event }) =>
                api.events.contracts.Instantiated.is(event)
              )
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
              txHash: blockNumber,
              contractAddress
            })
          }
        }
      )
    } catch (error) {
      const msg = getErrorMessage(error) || 'Unknow error signing transaction'
      reject(msg === 'Cancelled' ? 'Transaction was cancelled' : msg)
    }
  })
}
