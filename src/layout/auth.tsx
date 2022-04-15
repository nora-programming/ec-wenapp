import { Box } from '@chakra-ui/react'

type propsType = {
  children: React.ReactNode
}

export const Auth = ({ children }: propsType) => {
  return (
    <Box w="1020px" mx="auto" my="40px">
      {children}
    </Box>
  )
}
