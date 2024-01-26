import { useState, useEffect } from 'react'
import { useApiPrivate } from '../hooks/useApi'

const User = () => {
  const [users, setUsers] = useState([])
  const apiPrivate = useApiPrivate()
  // const navigate = useNavigate()
  // const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const abortCtrl = new AbortController()

    const getUsers = async () => {
      try {
        const res = await apiPrivate.get('users', { signal: abortCtrl.signal })
        isMounted && setUsers(res.data?.users)
      } catch (err) {
        console.log(err?.response?.data.message)
        // navigate('/', { state: { from: location }, replace: true })
      }
    }

    getUsers()
    return () => {
      isMounted = false
      abortCtrl.abort()
    }
  }, [apiPrivate])

  return (
    <article>
      <h2>User list : </h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.email}</li>
          ))}
        </ul>
      ) : (
        <p>No user was found</p>
      )}
    </article>
  )
}

export default User
