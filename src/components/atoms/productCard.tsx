import { Box, Text, Image } from '@chakra-ui/react'

type propsType = {
  children: string
  imgUrl: string
  price: number
}

export const ProductCard = ({ children, imgUrl, price }: propsType) => {
  return (
    <Box h="230px" w="230px" cursor="pointer" _hover={{ opacity: 0.9 }}>
      <Box position="relative">
        <Text
          color="white"
          fontWeight="bold"
          position="absolute"
          right="8px"
          top="8px"
          padding="4px"
          borderRadius="4px"
          bg="rgba(0, 0, 0, 0.3)"
        >
          {price}円
        </Text>
        <Image src={imgUrl} borderRadius="8px" />
      </Box>
      <Text
        fontWeight="bold"
        fontSize="20px"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {children}
      </Text>
    </Box>
  )
}
