import React from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';
import ThemeCustomization from '@themes';
import { MainLayout } from 'src/view/layout';
import { buildEmotionCache } from '@utils';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SettingsConsumer } from 'src/context/settingsTheme';

type CustomAppProps = AppProps & {
  emotionCache: EmotionCache;
  Component: NextPage & {
    getLayout?: (_page: React.ReactElement) => React.ReactNode;
  };
};

const clientEmotionCache = buildEmotionCache();

export default function App(props: CustomAppProps) {
  const { Component, emotionCache = clientEmotionCache, pageProps } = props;

  const getLayout =
    Component.getLayout ?? (page => <MainLayout>{page}</MainLayout>);

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

      <SettingsConsumer>
        {({ settings }) => {
          return (
            <ThemeCustomization settings={settings}>
              {getLayout(<Component {...pageProps} />)}
            </ThemeCustomization>
          );
        }}
      </SettingsConsumer>
    </CacheProvider>
  );
}
