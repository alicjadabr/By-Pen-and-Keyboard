import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { IoReorderThreeOutline, IoLogOutOutline } from 'react-icons/io5'
import { FaRegBell } from 'react-icons/fa'
import { BiEditAlt } from 'react-icons/bi'
 
const MainLayout = ({ children }: React.PropsWithChildren) => {

  const { data: sessionData, status } = useSession()

  return (
    <div className='flex flex-col w-full h-full'>
      <header className='h-20 w-full flex flex-row justify-around items-center
       bg-white border-b-[1px] border-gray-300'>

        <div>
          <IoReorderThreeOutline className='text-2xl text-gray-600'/>
        </div>

        <div className='font-thin text-xl'>Blog App</div>

        {status === 'authenticated' ? (
          <div className='flex items-center space-x-2'>
      
            <FaRegBell className='text-2xl text-gray-600'/>
          
            <div className='w-5 h-5 bg-gray-600 rounded-full'></div>
      
            <button className='flex items-center px-4 py-2 space-x-2 text-white
            border bg-green-600 rounded-full transition
            hover:bg-green-700'>
              <div>Dodaj</div>
              <div>
                <BiEditAlt />
              </div>
            </button>

            <button 
              onClick={() => signOut()}
              className='flex items-center px-4 py-2 space-x-2 
              border bg-red-500 text-white rounded-full 
              transition hover:bg-red-700'
            >
              <div>Wyloguj</div>
              <div>
                <IoLogOutOutline className='text-lg' />
              </div>
            </button>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => signIn()}
              className='flex items-center px-4 py-2 space-x-2 
              border border-gray-200 rounded-full transition
              hover:border-gray-900  hover:text-gray-900'
            >
              Zaloguj 
            </button>
          </div>
        )}
      </header>
        {children}
    </div>
  )
}
 
export default MainLayout