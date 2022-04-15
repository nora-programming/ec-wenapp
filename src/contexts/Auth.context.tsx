import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { UserType } from 'src/type/user'

type AuthContextProps = {
  currentUser: UserType | null | undefined
  setCurrentUser: Dispatch<SetStateAction<UserType | null | undefined>>
}

const AuthContext = createContext<AuthContextProps>(undefined as never)

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<UserType | null | undefined>()

  useEffect(() => {
    // TODO APIでユーザー情報取得
    const user = {
      id: 1,
      email: 'hoge@gmail.com',
      imgUrl: 'https://bit.ly/dan-abramov',
    }
    setCurrentUser(user)
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
