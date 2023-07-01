import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '~/layout/MainLayout'
import { api } from '~/utils/api'
import { TbPhotoEdit } from 'react-icons/tb'
import { PiShareFatDuotone } from 'react-icons/pi'
import Post from '~/components/Post'

const UserProfilePage = () => {
  const router = useRouter()

  const { data: profile } = api.user.getUserProfile.useQuery({
    username: router.query.username as string
  }, {
    // only enable this query then router query username variable is present
    enabled: !!router.query.username
  })

  const { data: user, isSuccess } = api.user.getUserPosts.useQuery({
    username: router.query.username as string
  }, {
    enabled: !!router.query.username
  })

  return (
    <MainLayout>
      <div className='flex h-full w-full items-center justify-center'>
        <div className='lg:max-w-screen justify-center md:max-w-screen-lg my-10 flex h-full w-full flex-col items-center'>
          <div className='flex flex-col w-full bg-white rounded-3xl shadow-xl'>
            <div className='relative h-44 w-full rounded-t-3xl bg-gradient-to-tr from-violet-500 to-orange-300'>
              <div className='absolute -bottom-10 left-12 '>
                <div className='group relative w-28 h-28 rounded-full border-4 border-white bg-gray-100 cursor-pointer'>
                  <label htmlFor='avatar' className='absolute flex items-center justify-center rounded-full group-hover:bg-black/20 z-10 h-full w-full transition duration-500'>
                    <TbPhotoEdit className='text-3xl text-white hidden group-hover:block'/>
                    <input 
                      type='file' 
                      name='avatar' 
                      id='avatar'
                      className='sr-only'
                      accept='image/*'
                    />
                  </label>
                    {profile?.image && (
                      <Image 
                        src={profile?.image}
                        alt={profile?.name ?? ''}
                        fill
                        className='rounded-full'
                      />
                    )}
                </div>
              </div>
            </div>
            <div className='mt-10 ml-12 flex flex-col space-y-1.5 rounded-b-3xl pb-6'>
              <span className='text-2xl font-semibold text-gray-800'>
                {profile?.name}
              </span>
              <span className='text-gray-500'>
                @{profile?.username}
              </span>
              <span className='text-gray-500'>
                Dodanych artykułów: {profile?._count.posts}
              </span>
              <div>
                <button 
                  className='transition ease-in-out flex space-x-2 items-center px-3 py-1.5
                  border border-gray-400/50 rounded-3xl hover:scale-105
                  hover:bg-indigo-200 duration-300'
                >
                  <span>Obserwuj</span>
                  <span>
                    <PiShareFatDuotone />
                  </span>
                </button>
              </div>

            </div>
          </div>
          <div className='my-10 p-3'>
            {isSuccess && user?.posts.map((post) => (
              <Post {...post} key={post.id}/>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserProfilePage
