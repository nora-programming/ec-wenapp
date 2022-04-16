import { AuthContext } from 'src/contexts/Auth.context'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useRequireSignout = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (currentUser === undefined) return

    if (currentUser !== null) {
      router.push('/')
      return
    }
  }, [currentUser, router])
}
