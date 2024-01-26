import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useApiPrivate } from '../hooks/useApi'
import { Fragment, useEffect } from 'react'

export default function HomePage() {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const apiPrivate = useApiPrivate()

  useEffect(() => {
    const abortCtrl = new AbortController()
    const getMe = async () => {
      try {
        const res = await apiPrivate.get('users/whoiam', {
          signal: abortCtrl.signal
        })
        const { email } = res.data.user
        setAuth((prev) => ({ ...prev, email }))
      } catch (error) {
        console.log(error?.response?.data.message)
      }
    }

    getMe()
    return () => {
      abortCtrl.abort()
    }
  }, [apiPrivate, setAuth])

  const onLogout = async () => {
    // delete access_token
    setAuth({})
    try {
      await apiPrivate.post('auth/logout')
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  return (
    <section className='flex items-center flex-col justify-center gap-4 min-h-screen'>
      {auth && auth.email ? (
        <Fragment>
          <p className='text-3xl'>
            Hello, wellcomeback user, <b>{auth.email}</b>, enjoy your day
          </p>
          <button
            onClick={onLogout}
            className='text-white w-1/4 bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          >
            Logout
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className='text-3xl font-semibold'>
            Hello, please login or register an account
          </h1>
          <div className='flex gap-2 items-center'>
            <Link
              to='/login'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
            >
              Login
            </Link>

            <Link
              to='/register'
              className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '
            >
              Register
            </Link>
          </div>
        </Fragment>
      )}

      <div className='w-72 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg '>
        <Link
          to='/admin'
          className='block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer'
        >
          ADMIN
        </Link>
        <Link
          to='/posts'
          className='block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 '
        >
          POSTS
        </Link>
        <Link
          to='/'
          className='block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 '
        >
          Messages
        </Link>
        <Link
          to='/'
          className='block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 '
        >
          Download
        </Link>
      </div>
    </section>
  )
}
