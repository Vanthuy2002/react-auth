import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const onChangeForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onLoginToSystem = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('auth', { ...form }, { withCredentials: true })
      const { access_token } = res.data
      setAuth((prev) => ({ ...prev, access_token })) // get access_token to Context
      navigate('/')
    } catch (err) {
      console.log(err?.response.data.message)
    }
  }

  return (
    <section className='bg-gray-800'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Login with your account
            </h1>
            <form
              onSubmit={onLoginToSystem}
              className='space-y-4 md:space-y-6'
              autoComplete='off'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Your email
                </label>
                <input
                  onChange={onChangeForm}
                  value={form.email}
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                  placeholder='name@company.com'
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  onChange={onChangeForm}
                  value={form.password}
                  autoComplete='off'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Login
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Not have an account?{' '}
                <Link
                  to='/register'
                  className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
                  Register account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
