import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import Loader from '~/components/Loader'
import { api } from '~/utils/api'
import Link from 'next/link'

const MainSection = () => {
  
  const { 
    data: posts, 
    isSuccess, isLoading: 
    loadingPosts 
   } = api.post.getAll.useQuery()

  return (
    <main className='col-span-8 border-r border-gray-300 px-24'>  
      {/* Search part start */}
      <div className='flex flex-col space-y-4 w-full py-10'>
        <div className='flex items-center space-x-4 w-full'>
          <label 
            htmlFor='search' 
            className='relative w-full border border-gray-800 rounded-2xl'
          >
            <div className='absolute left-2 h-full flex items-center'>
              <BiSearch className='text-gray-400'/>
            </div>
            <input 
              type='text' 
              name='search' 
              id='search' 
              placeholder='Wyszukaj...'
              className='outline-none pl-7 py-1 px-4 w-full rounded-2xl'
            />
          </label>
  
          <div className='flex items-center w-full space-x-4 justify-end'>
            <div>Moje tematy:</div>
            <div className='flex space-x-2 items-center'>
              {Array.from({ length: 4}).map((_, i) => (
                <div key={i} className='rounded-3xl bg-gray-200 px-4 py-3'>
                  tag {i}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full justify-between flex items-center 
        border-b border-gray-300 pb-8'>
          <span>Artykuły</span>
          <button 
            className='flex space-x-2 items-center px-4 py-1.5
            border border-gray-800 rounded-3xl'
          >
            <div>Obserwowane</div>
            <div>
              <HiOutlineChevronDown className='text-xl'/>
            </div>
          </button>
        </div>
      </div>
      {/* Search part end */}

      {/* Articles part start */}
      <div className='flex flex-col w-full justify-center space-y-7'>
        {loadingPosts && <Loader size={50} />}
        {isSuccess && posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/${post.slug}`}
            className='flex flex-col group space-y-4 border-b border-gray-300 
            pb-8 last:border-none'>
            {/* Article header part (author + date) */}  
            <div className='flex w-full items-center space-x-3'>
              {/* Article author image */}
              <div className='h-10 w-10 relative bg-gray-400 rounded-full flex-none'>
                {post.author.image && 
                  <Image
                    src={post.author.image}
                    fill
                    alt={post.author.name ?? ''}
                    className='rounded-full'
                  />
                }
              </div>
              {/* Article author info and articte created date*/}
              <div>
                <p className='font-semibold'>
                  {post.author.name} &#x2022;
                  <span className='mx-2'>
                    {dayjs(post.createdAt).format('DD-MM-YYYY')}
                  </span>
                </p>
                <p className='text-sm'>podróżnik bla bla</p>
              </div>
            </div>

            {/* Article content part */}  
            <div className='grid grid-cols-12 w-full gap-4'>
              <div className='col-span-8 flex flex-col space-y-4'>
                <p className='transition ease-in-out duration-300 text-3xl font-bold
                  text-gray-800 group-hover:-translate-y-2 hover:text-indigo-400'>
                  {post.title}
                </p>
                <p className='text-sm text-gray-500 breake-words'>
                  {post.description}
                </p>
              </div>

              <div className='col-span-4'>
                <div className='bg-gray-300 w-full h-full rounded-xl transition 
                hover:scale-105 transform duration-500 hover:shadow-xl'></div>
              </div>
            </div>
            {/* Article footer part (tags) */}  
            <div>
              <div className='flex items-center w-full space-x-4 justify-start'>
                <div className='flex space-x-2 items-center'>
                  {Array.from({ length: 4}).map((_, i) => (
                    <div 
                      key={i}     
                      className='rounded-3xl bg-gray-200/50 px-5 py-3'
                    >
                      tag {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link> 
        ))}
      </div>
      {/* Articles part end */}
    </main>
  )
}

export default MainSection