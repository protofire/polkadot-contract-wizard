import React from 'react'
import { NextPage } from 'next'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import PlausibleProvider from 'next-plausible'
import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import ThemeCustomization from '@/themes'
import { MainLayout } from '@/view/layout'
import { buildEmotionCache } from '@/utils/builderEmotionCache'
import { SettingsConsumer } from '@/context/settingsTheme'
import { NetworkAccountsContextProvider } from '@/context/NetworkAccountsContext'
import {
  AppNotificationContextProvider,
  StorageNotificationsRepository
} from '@/context/AppNotificationContext'
import { CustomSnackBar as AppNotification } from '@/view/components/Snackbar'
import { DAPP_CONFIG, DOMAIN } from '@/constants/config'
import { UseInkProvider } from 'useink'
import { CHAINS } from '@/constants/chains'
import { LocalDbProvider } from '@/context/LocalDbContext'
import { Inter } from 'next/font/google'

type CustomAppProps = AppProps & {
  emotionCache: EmotionCache
  Component: NextPage & {
    getLayout?: (_page: React.ReactElement) => React.ReactNode
  }
}
const inter = Inter({ subsets: ['latin'] })

const clientEmotionCache = buildEmotionCache()
const repositoryAppNotification = new StorageNotificationsRepository()

export default function App(props: CustomAppProps) {
  const { Component, emotionCache = clientEmotionCache, pageProps } = props

  const getLayout =
    Component.getLayout ?? (page => <MainLayout>{page}</MainLayout>)

  return (
    <div className={inter.className}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`Polkadot Contract Wizard`}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <style>
            {`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}
          </style>
        </Head>
        <PlausibleProvider domain={DOMAIN}>
          <UseInkProvider
            config={{
              dappName: DAPP_CONFIG.name,
              chains: CHAINS
            }}
          >
            <LocalDbProvider>
              <NetworkAccountsContextProvider>
                <AppNotificationContextProvider
                  repository={repositoryAppNotification}
                >
                  <SettingsConsumer>
                    {({ settings }) => {
                      return (
                        <ThemeCustomization settings={settings}>
                          {getLayout(<Component {...pageProps} />)}
                        </ThemeCustomization>
                      )
                    }}
                  </SettingsConsumer>
                  <AppNotification />
                </AppNotificationContextProvider>
              </NetworkAccountsContextProvider>
            </LocalDbProvider>
          </UseInkProvider>
        </PlausibleProvider>
      </CacheProvider>
    </div>
  )
}
