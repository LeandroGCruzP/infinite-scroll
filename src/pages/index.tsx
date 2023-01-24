import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { formatDate } from '~/utils/formatDate'

type UserData = {
  avatar: string
  createdAt: string
  id: string
  name: string
}

export default function Home () {
  const [users, setUsers] = useState<UserData[]>()

  useEffect(() => {
    axios.get('https://637cef8b16c1b892ebc36861.mockapi.io/just-save/users')
      .then(res => setUsers(res.data))
  }, [])

  return (
    <div className='bg-gray-900 h-full flex justify-center'>
      <table>
        <thead>
          <tr className='text-slate-500'>
            <th>ID</th>
            <th>USER</th>
            <th>CREATED</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users?.map(user => (
            <tr key={user.id} className='text-slate-50'>
              <td className='px-4 py-2'>
                {user.id}
              </td>

              <td className='flex items-center gap-2 px-4 py-2'>
                <Image src={user.avatar} alt={user.name} width={35} height={35} className='rounded-full' />
                <span>{user.name}</span>
              </td>

              <td className='px-4 py-2'>
                {formatDate(user.createdAt)}
              </td>

              <td className='px-4 py-2'>
                <button className='bg-green-500 px-2 py-1 rounded-md'>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
