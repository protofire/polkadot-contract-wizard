import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '@next/third-parties/google'

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
      <GoogleAnalytics gaId="G-FD4L2EDXFX" />
    </Html>
  )
}
