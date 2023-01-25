import Image from 'next/image'
import { useEffect, useState } from 'react'

type FollowerData = {
  login: string
  id: number
  avatar_url: string
  type: string
}

export default function Home () {
  const [followers, setFollowers] = useState<FollowerData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isDataEmpty, setIsDatEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const ENDPOINT = 'https://api.github.com/users/LeandroGCruzP/followers'
    const URL_CONFIGURED = `${ENDPOINT}?per_page=8&page=${currentPage}&order=DESC`

    fetch(URL_CONFIGURED)
      .then(response => response.json())
      .then((newFollowers: FollowerData[]) => {
        if (newFollowers.length) {
          setFollowers(prevFollowers => [...prevFollowers, ...newFollowers])
        } else {
          setIsDatEmpty(true)
        }
      })
      .finally(() => setIsLoading(false))
  }, [currentPage])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !isDataEmpty) {
        setCurrentPage(currentPageInsideState => currentPageInsideState + 1)
      }
    })

    const liSentinel = document.querySelector('#sentinel') as HTMLLIElement

    if (!isLoading) {
      intersectionObserver.observe(liSentinel)
    }

    return () => intersectionObserver.disconnect()
  }, [isDataEmpty, isLoading])

  return (
    <div className='min-h-screen h-full bg-gray-900 text-slate-50'>
      <span className='text-slate-400 text-2xl flex mb-4 sticky top-0'>
        Current Page: {currentPage}
      </span>

      <ul className='flex flex-col gap-4 items-center'>
        {followers?.map(follower => (
          <li key={follower.id} className='bg-zinc-700 p-4 rounded-lg w-5/12'>
            <div className='flex gap-4'>
              <Image src={follower.avatar_url} alt={follower.login} width={100} height={100} className='rounded-md' />

              <div className='flex flex-col'>
                <span>{follower.login}</span>
                <span>{follower.type}</span>
              </div>
            </div>
          </li>
        ))}

        <li id='sentinel' className='bg-red-600 h-[100px]' />
      </ul>
    </div>
  )
}
