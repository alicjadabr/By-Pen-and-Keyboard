import { useRouter } from 'next/router'
import React from 'react'
import Loader from '~/components/Loader'
import MainLayout from '~/layout/MainLayout'
import { api } from '~/utils/api'

const PostPage = () => {

  const router = useRouter()
  const { isLoading: loadingPost, data: post } = api.post.getSingle.useQuery({
    slug: router.query.slug as string
  }, {
    enabled: Boolean(router.query.slug)
  })

  return (
    <MainLayout>
      {loadingPost && (
        <span className='mt-10'>
          <Loader size={50} />
        </span>
      )}
    
      <div className='flex flex-col w-full h-full justify-center items-center p-10'>
        <div className='w-full max-w-screen-lg flex flex-col space-y-6'>
          <div className='h-[60vh] relative rounded-xl bg-gray-300 shadow-lg w-full'>
            <div className='absolute flex w-full h-full items-center justify-center'>
              <span className='bg-black bg-opacity-50 p-4 rounded-xl text-white text-3xl'>
                {post?.title}
              </span>
            </div>
          </div>
          <div className='border-l-4 pl-6 border-gray-600'>
            {post?.description}
          </div>
          <div>
            {post?.text}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PostPage