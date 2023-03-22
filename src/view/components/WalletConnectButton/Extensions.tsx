import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { StyledButton } from '../Button'
import { ModalMessage } from '@components'

const NAME = 'Polkadot Contract Wizard'

const Extensions = () => {
  const [allAccounts, setAllAccounts] = useState<InjectedAccountWithMeta[]>()
  const [openModal, setOpenModal] = useState(false)

  const getAccounts = async () => {
    try {
      const extensions = await web3Enable(NAME)
      // const allAccounts = await web3Accounts()
      // setAllAccount(allAccounts)
    } catch (e) {
      console.log('__Error', e)
      return
    }
  }

  useEffect(() => {
    getAccounts()
  }, [])

  return (
    <>
      <div>
        {allAccounts?.length ? (
          allAccounts.map(account => {
            return (
              <div key={account.address}>
                <div className="font-bold mb-2 text-white">
                  {account.address}
                </div>
              </div>
            )
          })
        ) : (
          <StyledButton color="error" onClick={() => setOpenModal(true)}>
            Wrong connection
          </StyledButton>
        )}
      </div>
      <ModalMessage
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="There is not Extensions available to connect to Polkadot network"
        body="There is not polkadot wallet installed or it is possible that you
      rejected the wallet connection (Please open the wallet and delete the
      rejected action)."
      />
    </>
  )
}

export default Extensions
