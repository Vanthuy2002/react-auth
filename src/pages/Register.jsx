import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiPrivate } from '../api'

export default function Register() {
  const [form, setForm] = useState({ email: '', pwd: '' })

  const onChangeForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate()
  const onRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await apiPrivate.post('register', {
        ...form,
        roles: ['editor']
      })
      console.log(res.data.message)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='bg-gray-800'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Create and account
            </h1>
            <form
              onSubmit={onRegister}
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
                  value={form.email}
                  onChange={onChangeForm}
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
                  value={form.pwd}
                  onChange={onChangeForm}
                  autoComplete='off'
                  name='pwd'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Create an account
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
