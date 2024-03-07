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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
