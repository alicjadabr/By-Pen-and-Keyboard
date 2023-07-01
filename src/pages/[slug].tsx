import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import Loader from '~/components/Loader'
import MainLayout from '~/layout/MainLayout'
import { api } from '~/utils/api'
import { BsChatText } from 'react-icons/bs'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import toast from 'react-hot-toast'
import CommentSidebar from '~/components/CommentSidebar'


const PostPage = () => {

  const router = useRouter()

  const postRoute = api.useContext().post

  const { isLoading: loadingPost, data: post, isSuccess } = api.post.getSingle.useQuery({
    slug: router.query.slug as string
  }, {
    enabled: Boolean(router.query.slug)
  })

  const invalidateCurrentPostPage = useCallback(() => {
    postRoute.getSingle.invalidate({ slug: router.query.slug as string})
  }, [postRoute.getSingle, router.query.slug])

  const likePost = api.post.likePost.useMutation({
    onSuccess: () => {
      toast('Polubiono post!', {
        icon: '❤️‍🔥',
      })
      invalidateCurrentPostPage()
    }
  })

  const dislikePost = api.post.dislikePost.useMutation({ 
    onSuccess: () => {
      toast('Usunięto polubienie dla tego postu', {
        icon: '💔',
      })
      invalidateCurrentPostPage()
    }
  })

  const [showComments, setShowComments] = useState(false)

  return (
    <MainLayout>

      {post?.id && (
        <CommentSidebar 
          showComments={showComments} 
          setShowComments={setShowComments}
          postId={post?.id}
        />
      )}

      {loadingPost && (
        <span className='mt-10'>
          <Loader size={50} />
        </span>
      )}

      {isSuccess && (
        <div className='fixed bottom-10 w-full flex justify-center items-center'>
          <div className='rounded-full px-6 py-3 flex items-center space-x-3 bg-white shadow-lg
          border border-gray-400 hover:border-gray-800 group transition duration-300 ease-in-out'>
            <span className='border-r pr-4 border-gray-400 transition duration-300 group-hover:border-gray-800'>
              
              {post?.likes && post?.likes.length > 0 ? (
                <FcLike
                  className='text-2xl hover:scale-125 cursor-pointer transition duration-500 ease-in-out'
                  onClick={() => post?.id && dislikePost.mutate({ postId: post?.id})}
                />

              ) : (
                <FcLikePlaceholder
                  className='text-2xl hover:scale-125 cursor-pointer transition duration-500 ease-in-out'
                  onClick={() => post?.id && likePost.mutate({ postId: post?.id})}
                />
              )}
              
            </span>
            <span>
              <BsChatText 
                className='text-xl text-gray-600 hover:scale-125 cursor-pointer transition duration-500 ease-in-out'
                onClick={() => setShowComments(true)}
              />
            </span>
          </div>
        </div>
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