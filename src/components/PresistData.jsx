import { Fragment, useEffect, useState } from 'react'
import { useRefreshToken } from '../hooks/useApi'
import { useAuth } from '../hooks/useAuth'
import { Outlet } from 'react-router-dom'

export const PresistData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.log(err?.response?.data?.message)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !auth.access_token ? verifyRefreshToken() : setIsLoading(false)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Fragment>{isLoading ? <p>Loading....</p> : <Outlet></Outlet>}</Fragment>
  )
}
