import React, { Fragment  } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from "~/utils/api";
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type CommentSidebarProps = {
  showComments: boolean,
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>
  postId: string
}

type CommentType = { text: string }

const commentSchema = z.object({
  text: z.string().min(10),
})

const CommentSidebar = ({showComments, setShowComments, postId}: CommentSidebarProps ) => {

  const {
    data: comments, 
    isSuccess, 
    isLoading: loadingComments
  } = api.post.getComments.useQuery({ postId: postId })


  const { 
    register, 
    handleSubmit, 
    formState: { isValid },
    reset
  } = useForm<CommentType>({
    resolver: zodResolver(commentSchema)
  })

  const postRoute = api.useContext().post

  const createComment = api.post.addComment.useMutation({
    onSuccess: () => {
      toast.success('Komentarz został dodany!')
      postRoute.getComments.invalidate()
      reset()
    },
    onError: (e) => {
      toast.error(e.message)
    }
  })

  return (
    <Transition.Root
        show={showComments}
        as={Fragment}
      >
        <Dialog as='div' onClose={() => setShowComments(false)}>
          <div className='fixed right-0 top-0'>
            <Transition.Child 
              enter='transition duration-1000'
              leave='transition duration-500'
              enterFrom='translate-x-full'
              enterTo='-translate-x-0'
              leaveFrom='-translate-x-0'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel className='relative w-[200px] sm:w-[400px] h-screen max-w-md bg-white shadow-lg'>
                <div className='flex flex-col w-full h-full px-5 overflow-scroll'>
                  <div className='flex justify-between mt-10 mb-3 text-xl px-3 items-center'>
                    <h2 className='font-semibold'>
                      Komentarze ({comments?.length})
                    </h2>
                    <AiOutlineClose 
                      className='cursor-pointer'
                      onClick={() => setShowComments(false)}
                    />
                  </div>
                  
                  <form 
                    onSubmit={handleSubmit(data => {
                      createComment.mutate({
                        ...data,
                        postId
                      })
                    })}
                    className='p-5 flex flex-col items-end space-y-3'
                  >
                    <textarea 
                      id='comment' 
                      rows={3}
                      placeholder='Treść komentarza'
                      {...register('text')}
                      className='w-full h-full border border-gray-300 outline-none
                      focus:border-gray-600 p-4 rounded-xl shadow-lg'
                    />
                    {isValid && (
                    <button 
                      type='submit'
                      className='flex items-center px-4 py-2 space-x-2 text-white
                      border bg-gray-800 rounded-xl transition
                      hover:bg-gray-500'
                    >
                      Dodaj komentarz
                    </button>
                    )}
                  </form>
                
                  <div className='flex flex-col space-y-4 justify-center items-start'>
                    {isSuccess && comments.map((comment) => (
                      <div 
                        className='flex flex-col p-4 space-y-3 border-b last:border-none' 
                        key={comment.id}
                        > 
                        {/* Comment author part (author + date) */}  
                        <div className='flex w-full items-center space-x-3'>
                          {/* author image */}
                          <div className='h-8 w-8 relative bg-gray-400 rounded-full flex-none'>
                          {comment.user.image && 
                            <Image
                              src={comment.user.image }
                              fill
                              alt={comment.user.name ?? ''}
                              className='rounded-full'
                            />
                          }
                          </div>
                          {/* author info and comment created date*/}
                          <div>
                            <p className='font-semibold'>{comment.user.name}</p>
                            <p className='text-xs text-gray-500 italic'>
                              {dayjs(comment.createdAt).fromNow(true)}
                            </p>
                          </div>
                        </div>
                        {/* Comment content */}  
                        <div className='text-sm text-gray-600'>
                          {comment.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </Dialog>

      </Transition.Root>
  )
}

export default CommentSidebar