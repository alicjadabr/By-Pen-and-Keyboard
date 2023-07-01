import React, { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { BsBookmarkPlus, BsBookmarkX } from 'react-icons/bs'
import { type RouterOutputs, api } from '~/utils/api'
import toast from 'react-hot-toast'

type PostProps = RouterOutputs['post']['getAll'][number]
const Post = ({...post}: PostProps) => {

  const[isBookmarked, setIsBookmared] = useState(Boolean(post.bookmarks?.length))

  const addBookmark = api.post.addBookmark.useMutation({
    onSuccess: () => {
      toast('Post został dodany do listy do przeczytania!', {
        icon: '📖',
      })
      setIsBookmared(prev => !prev)
    }
  })

  const delBookmark = api.post.deleteBookmark.useMutation({
    onSuccess: () => {
      toast('Usunięto post z listy do przeczytania', {
        icon: '🗑️',
      })
      setIsBookmared(prev => !prev)
    }
  })

  return (
    <div
      key={post.id} 
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
      <Link 
        className='grid grid-cols-12 w-full gap-4'
        href={`/${post.slug}`}
      >
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
      </Link>
      {/* Article footer part (tags) */}  
      <div>
        <div className='flex items-center w-full space-x-4 justify-between'>
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
    
          <span>
            {isBookmarked ? (
              <BsBookmarkX 
                className='text-3xl cursor-pointer text-gray-700'
                onClick={() => delBookmark.mutate({postId: post.id})}
              />
            ) : (
              <BsBookmarkPlus 
                className='text-3xl cursor-pointer text-gray-700'
                onClick={() => addBookmark.mutate({postId: post.id})}
              />
            )}
          </span>
        
        </div>
      </div>
    </div> 
  )
}

export default Post