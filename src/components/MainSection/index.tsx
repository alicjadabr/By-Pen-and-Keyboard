import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import Loader from '~/components/Loader'
import { api } from '~/utils/api'
import Post from '../Post'

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
          <Post {...post} key={post.id}/>
        ))}
      </div>
      {/* Articles part end */}
    </main>
  )
}

export default MainSection