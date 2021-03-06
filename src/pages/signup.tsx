import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { EmailIcon, UnlockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { Common } from 'src/layout/common'
import { Button } from 'src/components/atoms/button'
import { useRequireSignout } from 'src/hooks/useRequireSignout'
import axios from 'axios'
import { AuthContext } from 'src/contexts/Auth.context'
import { useToast } from '@chakra-ui/react'

const Signup: NextPage = () => {
  useRequireSignout()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = () => setShow(!show)
  const { setCurrentUser } = useContext(AuthContext)
  const toast = useToast()

  const register = async () => {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    try {
      const res = await axios.post(`http://localhost:8080/signup`, data)
      setCurrentUser(res.data)
      router.push('/')
      toast({
        description: '新規登録しました！',
        duration: 3000,
        isClosable: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Common>
        <Box mt="48px">
          <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
            新規登録
          </Text>
          <Box w="400px" mx="auto">
            <InputGroup mb="24px">
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="メールアドレスを入力してください"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup mb="24px">
              <InputLeftElement pointerEvents="none">
                <UnlockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="パスワードを入力してください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <>
                  {show ? (
                    <ViewOffIcon
                      cursor="pointer"
                      onClick={handleClick}
                      color="gray.300"
                    />
                  ) : (
                    <ViewIcon
                      cursor="pointer"
                      onClick={handleClick}
                      color="gray.300"
                    />
                  )}
                </>
              </InputRightElement>
            </InputGroup>
            <Button onClick={() => register()}>登録する</Button>
            <Text
              mt="16px"
              fontSize="14px"
              color="blue.300"
              cursor="pointer"
              textAlign="center"
              onClick={() => router.push('signin')}
              _hover={{ opacity: 0.7 }}
            >
              すでにアカウントをお持ちの方はこちら
            </Text>
          </Box>
        </Box>
      </Common>
    </>
  )
}

export default Signup
