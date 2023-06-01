import { DOMAIN, IS_PRODUCTION } from '@/constants/config'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={`Polkadot Contract Wizard`} />
        <meta
          name="keywords"
          content="Polkadot, Smart Contracts, code builder"
        />
        {IS_PRODUCTION && (
          <script
            defer
            data-domain={DOMAIN}
            src="https://plausible.io/js/script.js"
          ></script>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
