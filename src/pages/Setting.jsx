import { Fragment, useEffect, useState } from 'react'
import { useApiPrivate } from '../hooks/useApi'
import { Link } from 'react-router-dom'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const apiPrivate = useApiPrivate()

  useEffect(() => {
    const abortCtrl = new AbortController()
    const getPosts = async () => {
      try {
        const res = await apiPrivate.get('posts?page=1&limit=10', {
          signal: abortCtrl.signal
        })
        const posts = res.data?.posts
        setPosts(posts)
      } catch (error) {
        console.log(error)
      }
    }

    getPosts()
    return () => {
      abortCtrl.abort()
    }
  }, [apiPrivate])
  return (
    <Fragment>
      <h1>This is posts page, allow for all user</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id}>
              <p className='hover:text-blue-200 font-medium cursor-pointer'>
                {post.title}
              </p>
              <span>{post.author}</span>
            </li>
          ))
        ) : (
          <p>No posts to display</p>
        )}
      </ul>

      <Link
        to='/'
        className='text-white mt-5 inline-block w-1/4 bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
      >
        Back to Home
      </Link>
    </Fragment>
  )
}
