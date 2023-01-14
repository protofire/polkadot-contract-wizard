import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import ThemeCustomization from '@themes';
import { MainLayout } from 'src/view/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Polkadot Contract Wizard`}</title>
        <meta name="description" content={`Polkadot Contract Wizard`} />
        <meta
          name="keywords"
          content="Polkadot, Smart Contracts, code builder"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeCustomization >
        <MainLayout >  
          <Component {...pageProps} />
        </MainLayout>   
      </ThemeCustomization>

    </>
  );
}
