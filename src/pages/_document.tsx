import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ANALYTICS_ID } from '@/constants'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={`Polkadot Contract Wizard`} />
        <meta
          name="keywords"
          content="Polkadot, Smart Contracts, code builder"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      {ANALYTICS_ID && <GoogleAnalytics gaId={ANALYTICS_ID} />}
    </Html>
  )
}
