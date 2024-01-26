import { Link } from 'react-router-dom'
import User from '../components/User'

export default function Admin() {
  return (
    <section className='flex items-center justify-center min-h-screen bg-slate-600'>
      <article className='p-2 w-[400px] rounded shadow-sm bg-white'>
        <h1 className='font-semibold text-lg mb-2'>Wellcome to Admin pages</h1>
        <hr />
        <User></User>
        <hr />
        <Link
          to='/'
          className='text-white inline-block my-4 bg-green-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Go to Home
        </Link>
      </article>
    </section>
  )
}
