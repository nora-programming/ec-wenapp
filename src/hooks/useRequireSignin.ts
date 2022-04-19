import { AuthContext } from 'src/contexts/Auth.context'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export const useRequireSignin = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (currentUser === undefined) return

    if (currentUser === null) {
      toast({
        description: 'ログインが必要です',
        duration: 3000,
        isClosable: true,
      })
      router.push('/signin')
      return
    }
  }, [currentUser, router, toast])
}
