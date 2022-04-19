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
  useToast,
} from '@chakra-ui/react'
import { Common } from 'src/layout/common'
import { Button } from 'src/components/atoms/button'
import { useRequireSignout } from 'src/hooks/useRequireSignout'
import axios from 'axios'
import { AuthContext } from 'src/contexts/Auth.context'

const Signin: NextPage = () => {
  useRequireSignout()
  const toast = useToast()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = () => setShow(!show)
  const { setCurrentUser } = useContext(AuthContext)

  const login = async () => {
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    try {
      const res = await axios.post(`http://localhost:8080/signin`, data, {
        withCredentials: true,
      })
      setCurrentUser(res.data)
      toast({
        description: 'ログインしました！',
        duration: 3000,
        isClosable: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Common>
      <Box mt="48px">
        <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
          ログイン
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
          <Button onClick={() => login()}>ログインする</Button>
          <Text
            mt="16px"
            fontSize="14px"
            color="blue.300"
            cursor="pointer"
            textAlign="center"
            onClick={() => router.push('signup')}
            _hover={{ opacity: 0.7 }}
          >
            アカウントを作成
          </Text>
        </Box>
      </Box>
    </Common>
  )
}

export default Signin
