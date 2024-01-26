import PropTypes from 'prop-types'
import { createContext } from 'react'
import { useState } from 'react'

export const AuthContext = createContext({})

function AuthProviders({ children }) {
  const [auth, setAuth] = useState({})
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProviders.propTypes = {
  children: PropTypes.node
}

export default AuthProviders
