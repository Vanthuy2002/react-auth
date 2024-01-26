import { useEffect } from 'react'
import api, { apiPrivate } from '../api'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const res = await api.get('refresh-token', { withCredentials: true })
    const { access_token } = res.data
    setAuth((prev) => {
      return { ...prev, access_token }
    })
    return access_token
  }

  return refresh
}

export const useApiPrivate = () => {
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.access_token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const preRequest = err?.config
        if (err.response?.status === 403 && !preRequest.sent) {
          preRequest.sent = true
          const access_token = await refresh()
          preRequest.headers['Authorization'] = `Bearer ${access_token}`
          return apiPrivate(preRequest)
        }

        return Promise.reject(err)
      }
    )

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept),
        apiPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return apiPrivate
}
