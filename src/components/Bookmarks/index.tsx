import React from 'react'
import { MdFavorite } from 'react-icons/md'
import { api } from '~/utils/api'
import Image from 'next/image'
import dayjs from 'dayjs'
import Link from 'next/link'

const Bookmarks = () => {

  const {    
    data: bookmarks, 
    isSuccess, 
  } = api.post.getReadingList.useQuery()

  return (
    <div className='sticky top-20'>
      <div className='flex space-x-2 items-center mt-3 mb-5'>
        <MdFavorite className='text-2xl text-red-400'/> 
        <h3 className='font-bold text-lg'>Zapisane posty</h3>
      </div>
      <div className='flex flex-col space-y-8'>
        {isSuccess && bookmarks.map((bookmark) => (
          <Link 
            key={bookmark.id} 
            href={`/${bookmark.post.slug}`}
            className='flex space-x-6 items-center group'
          >
            <div className='h-full w-2/5 rounded-xl bg-gray-300 aspect-square'></div>
            <div className='w-3/5 flex flex-col space-y-2'>
              <div className='text-lg font-semibold transition ease-in-out duration-200
              group-hover:-translate-y-2 hover:text-indigo-400'>
                {bookmark.post.title}
              </div>
              <div className='truncate'>{bookmark.post.description}</div>
              <div className='flex space-x-2 items-center w-full'>
                <div className='w-8 h-8 bg-gray-300 rounded-full flex-none'>
                </div>
                <span>{bookmark.post.author.name}  &#x2022;</span>
                <span>{dayjs(bookmark.post.createdAt).format('DD-MM-YYYY')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Bookmarks