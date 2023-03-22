import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

const NAME = 'Polkadot Contract Wizard'

const Extensions = () => {
  const [allAccount, setAllAccount] = useState<InjectedAccountWithMeta[]>([])

  const getAccounts = async () => {
    const extensions = await web3Enable(NAME)
    console.log('__extensions', extensions)
    if (extensions.length === 0) {
      return
    }
    const allAccounts = await web3Accounts()
    setAllAccount(allAccounts)
  }

  useEffect(() => {
    getAccounts()
  }, [])

  return (
    <>
      <div>
        {typeof allAccount !== 'undefined'
          ? allAccount.map(account => {
              return (
                <div key={account.address}>
                  <div className="font-bold mb-2 text-white">
                    {account.address}
                  </div>
                </div>
              )
            })
          : ''}
      </div>
    </>
  )
}

export default Extensions
