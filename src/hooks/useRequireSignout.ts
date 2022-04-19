import { AuthContext } from 'src/contexts/Auth.context'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export const useRequireSignout = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const toast = useToast()
  useEffect(() => {
    if (currentUser === undefined) return

    if (currentUser) {
      router.push('/')
      return
    }
  }, [currentUser, router, toast])
}
