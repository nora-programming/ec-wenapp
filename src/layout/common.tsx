import { Box } from '@chakra-ui/react'
import { Header } from 'src/components/organisms/Header'

type propsType = {
  children: React.ReactNode
}

export const Common = ({ children }: propsType) => {
  return (
    <Box w="1020px" mx="auto">
      <Header />
      {children}
    </Box>
  )
}
