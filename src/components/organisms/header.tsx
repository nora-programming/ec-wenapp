import { useRouter } from 'next/router'
import { useContext } from 'react'
import {
  Flex,
  Box,
  Text,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { Button } from 'src/components/atoms/button'
import { AuthContext } from 'src/contexts/Auth.context'

export const Header = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const isAuthPage =
    router.pathname == '/signin' || router.pathname == '/signup'

  return (
    <Flex justifyContent="space-between" pt="16px" alignItems="center">
      <Text
        fontSize="32px"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => router.push('/')}
        _hover={{ opacity: 0.7 }}
      >
        EC-Mall
      </Text>
      <Spacer />
      {currentUser ? (
        <>
          <Box mr="16px">
            <Menu>
              <MenuButton>
                <Image
                  mt="4px"
                  borderRadius="full"
                  boxSize="40px"
                  src={currentUser.imgUrl}
                  alt="Dan Abramov"
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                <MenuItem fontSize="14px">プロフィールを更新</MenuItem>
                <MenuItem fontSize="14px">ログアウト</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box w="100px">
            <Button onClick={() => console.log('出品')}>出品する</Button>
          </Box>
        </>
      ) : (
        <>
          {!isAuthPage ? (
            <>
              <Box mr="16px" onClick={() => router.push('signin')}>
                <Text
                  color="gray.700"
                  fontWeight="bold"
                  cursor="pointer"
                  fontSize="14px"
                  _hover={{ opacity: 0.7 }}
                >
                  ログイン
                </Text>
              </Box>
              <Box w="100px">
                <Button onClick={() => router.push('signup')}>新規登録</Button>
              </Box>
            </>
          ) : (
            <Text
              fontSize="14px"
              color="blue.300"
              cursor="pointer"
              onClick={() => router.push('/')}
              _hover={{ opacity: 0.7 }}
            >
              商品一覧画面へ
            </Text>
          )}
        </>
      )}
    </Flex>
  )
}
