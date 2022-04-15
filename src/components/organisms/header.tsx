import { useContext } from 'react'
import { Flex, Box, Text, Spacer, Image } from '@chakra-ui/react'
import { Button } from 'src/components/atoms/button'
import { AuthContext } from 'src/contexts/Auth.context'

export const Header = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Flex justifyContent="space-between" pt="16px" alignItems="center">
      <Text fontSize="32px" fontWeight="bold">
        EC-Mall
      </Text>
      <Spacer />
      {currentUser ? (
        <>
          <Image
            borderRadius="full"
            boxSize="40px"
            src={currentUser.imgUrl}
            alt="Dan Abramov"
            cursor="pointer"
          />
        </>
      ) : (
        <>
          <Box mr="16px">
            <Text
              color="gray.700"
              fontWeight="bold"
              cursor="pointer"
              _hover={{ opacity: 0.7 }}
            >
              ログイン
            </Text>
          </Box>
          <Button>新規登録</Button>
        </>
      )}
    </Flex>
  )
}
