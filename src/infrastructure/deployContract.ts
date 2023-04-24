import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'

async function deployContract(
  wasmFile: string,
  metadataFile: string,
  endpoint: string,
  senderSeed: string
): Promise<string> {
  const provider = new WsProvider(endpoint)

  // Initialize the Polkadot API
  const api = await ApiPromise.create({ provider })

  // Get the sender account
  const keyring = new Keyring({ type: 'sr25519' })
  const sender = keyring.addFromSeed(Buffer.from(senderSeed, 'hex'))

  // Create the contract object
  const contract = new ContractPromise(api, metadata)

  // Define the deployment parameters
  const gasLimit = 200000n * 1000000n
  const endowment = 1000n * 1000000000000n

  // Send the contract deployment transaction
  const tx = contract.tx.new(endowment, gasLimit, wasm)

  const result = await tx.signAndSend(sender)

  // Return the contract's address
  return result.contract
}
