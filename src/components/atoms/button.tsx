import { Button as CButton } from '@chakra-ui/react'

type propsType = {
  children: string
  onClick: () => void
}

export const Button = ({ children, onClick }: propsType) => {
  return (
    <CButton colorScheme="teal" onClick={onClick} w="100%">
      {children}
    </CButton>
  )
}

export const GrayButton = ({ children, onClick }: propsType) => {
  return (
    <CButton colorScheme="gray" onClick={onClick} w="100%">
      {children}
    </CButton>
  )
}
