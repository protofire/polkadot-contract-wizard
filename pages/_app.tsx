import React from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import '../styles/globals.css'
import '../public/fonts/inter.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'

import ThemeCustomization from '@/themes'
import { MainLayout } from 'src/view/layout'
import { buildEmotionCache } from '@/utils/builderEmotionCache'
import { SettingsConsumer } from 'src/context/settingsTheme'
import { NetworkAccountsContextProvider } from 'src/context/NetworkAccountsContext'
import {
  AppNotificationContextProvider,
  StorageNotificationsRepository
} from 'src/context/AppNotificationContext'
import { CustomSnackBar as AppNotification } from 'src/view/components/Snackbar'
import { StorageContractsProvider } from '@/context'
import { LocalStorageContractRepository } from '@/infrastructure/LocalStorageContractRepository'

type CustomAppProps = AppProps & {
  emotionCache: EmotionCache
  Component: NextPage & {
    getLayout?: (_page: React.ReactElement) => React.ReactNode
  }
}

const clientEmotionCache = buildEmotionCache()
const repositoryAppNotification = new StorageNotificationsRepository()
const repositoryDeploys = new LocalStorageContractRepository()

export default function App(props: CustomAppProps) {
  const { Component, emotionCache = clientEmotionCache, pageProps } = props

  const getLayout =
    Component.getLayout ?? (page => <MainLayout>{page}</MainLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`Polkadot Contract Wizard`}</title>
        <meta name="description" content={`Polkadot Contract Wizard`} />
        <meta
          name="keywords"
          content="Polkadot, Smart Contracts, code builder"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <NetworkAccountsContextProvider>
        <AppNotificationContextProvider repository={repositoryAppNotification}>
          <StorageContractsProvider repository={repositoryDeploys}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeCustomization settings={settings}>
                    {getLayout(<Component {...pageProps} />)}
                  </ThemeCustomization>
                )
              }}
            </SettingsConsumer>
          </StorageContractsProvider>
          <AppNotification />
        </AppNotificationContextProvider>
      </NetworkAccountsContextProvider>
    </CacheProvider>
  )
}
