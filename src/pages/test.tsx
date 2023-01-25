import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

type FollowerData = {
  createdAt: string
  id: number
  avatar: string
  name: string
}

export default function Test () {
  const [users, setUsers] = useState<FollowerData[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const getUsers = useCallback(async () => {
    const ENDPOINT = 'https://637cef8b16c1b892ebc36861.mockapi.io/just-save/users'
    const URL_CONFIGURED = `${ENDPOINT}?page=${currentPage}&limit=10&order=desc`

    fetch(URL_CONFIGURED)
      .then(response => response.json())
      .then((newUsers: FollowerData[]) => {
        setUsers(prevUsers => [...prevUsers, ...newUsers])
      })
  }, [currentPage])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div className='bg-gray-900 h-screen grid justify-center'>
      <header className='h-14'>
        <span className='text-slate-50 text-2xl'>
          Testing Infinite Scroll - Virtuoso
        </span>
      </header>

      <ul>
        <Virtuoso
          data={users}
          endReached={() => setCurrentPage(currentPage + 1)}
          className='text-slate-50'
          style={{ height: 'calc(100vh - 3.5rem)' }}
          itemContent={(index, user) => {
            return (
              <li key={user.id} className='bg-gray-800 p-4 rounded-lg mb-2'>
                <div className='flex gap-4'>
                  <Image key={index} src={user.avatar} alt={user.name} width={100} height={100} className='rounded-md' />

                  <div className='flex flex-col'>
                    <span>{user.name} {index}</span>
                    <span>{user.createdAt}</span>
                  </div>
                </div>
              </li>
            )
          }}
        />
      </ul>
    </div>
  )
}
