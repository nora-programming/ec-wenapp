import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { UserType } from 'src/type/user'
import axios from 'axios'

type AuthContextProps = {
  currentUser: UserType | null | undefined
  setCurrentUser: Dispatch<SetStateAction<UserType | null | undefined>>
}

const AuthContext = createContext<AuthContextProps>(undefined as never)

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<UserType | null | undefined>()

  useEffect(() => {
    const f = async () => {
      try {
        const res: any = await axios.get(`http://localhost:8080/me`, {
          withCredentials: true,
        })
        setCurrentUser(res.data)
      } catch (e) {
        setCurrentUser(null)
      }
    }
    f()
  }, [])

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser: setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
