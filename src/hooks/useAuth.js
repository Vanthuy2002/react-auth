import { useContext } from 'react'
import { AuthContext } from '../context/AuthProviders'

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext)

  return { auth, setAuth }
}
