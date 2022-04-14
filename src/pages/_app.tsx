import { NextPage } from 'next'
import Head from 'next/head'

const MyApp: NextPage = ({ Component, pageProps }: any) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
