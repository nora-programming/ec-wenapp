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
  useDisclosure,
} from '@chakra-ui/react'
import { Button } from 'src/components/atoms/button'
import { AuthContext } from 'src/contexts/Auth.context'
import { HiOutlineUserCircle } from 'react-icons/Hi'
import { IconContext } from 'react-icons'
import { UserEditModal } from 'src/components/molecules/userEditModal'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

export const Header = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const router = useRouter()
  const isAuthPage =
    router.pathname == '/signin' || router.pathname == '/signup'

  const signout = async () => {
    try {
      await axios.delete(`http://localhost:8080/signout`, {
        withCredentials: true,
      })
      toast({
        description: 'ログアウトしました',
        duration: 3000,
        isClosable: true,
        status: 'error',
      })
      setCurrentUser(null)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <UserEditModal isOpen={isOpen} onClose={onClose} />
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
                  {currentUser.img_url ? (
                    <Image
                      mt="4px"
                      borderRadius="full"
                      boxSize="40px"
                      objectFit="cover"
                      src={currentUser.img_url}
                      cursor="pointer"
                    />
                  ) : (
                    <Box mt="4px">
                      <IconContext.Provider value={{ size: '40px' }}>
                        <HiOutlineUserCircle />
                      </IconContext.Provider>
                    </Box>
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="14px" onClick={() => onOpen()}>
                    プロフィールを更新
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    onClick={() => router.push('/purchased_products')}
                  >
                    購入した商品
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    onClick={() => router.push('/sales')}
                  >
                    売上
                  </MenuItem>
                  <MenuItem fontSize="14px" onClick={() => signout()}>
                    ログアウト
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box w="100px">
              <Button onClick={() => router.push('/product/new')}>
                出品する
              </Button>
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
                  <Button onClick={() => router.push('signup')}>
                    新規登録
                  </Button>
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
    </>
  )
}
