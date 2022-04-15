import { NextPage } from 'next'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'src/contexts/Auth.context'

const MyApp: NextPage = ({ Component, pageProps }: any) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
