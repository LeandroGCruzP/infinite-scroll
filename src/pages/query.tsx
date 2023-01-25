import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

type FollowerData = {
  createdAt: string
  id: number
  avatar: string
  name: string
}

export default function Query () {
  // I need receive incremetal page on function
  function getUsers () {
    const ENDPOINT = 'https://637cef8b16c1b892ebc36861.mockapi.io/just-save/users'
    const URL_CONFIGURED = `${ENDPOINT}?page=${1}&limit=10&order=desc`

    return fetch(URL_CONFIGURED)
      .then(response => response.json())
  }

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['users'],
    ({ pageParam }) => {
      console.log(pageParam) // The result is undefined but a need initialize in 1 and increment on load new pages
      return getUsers()
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.length
        console.log('[DATA]', lastPage.length)
      }
    }
  )

  const users = data?.pages[0]

  return (
    <div className='bg-gray-900 h-screen grid justify-center text-slate-50'>
      <header className='h-14'>
        <span className='text-2xl'>
          Testing Infinite Scroll - Virtuoso
        </span>
      </header>

      {isLoading ? (
        <span>
          Loading
        </span>
      ) : (
        <ul>
          {users?.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
