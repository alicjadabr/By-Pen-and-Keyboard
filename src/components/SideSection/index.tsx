import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { PiCursorClickDuotone } from 'react-icons/pi'

const SideSection = () => {
  return (
    <aside className='col-span-4 flex flex-col p-6 space-y-4'>
      <div>
        <div className='flex space-x-2 items-center mb-6'>
          <FaUsers className='text-2xl text-blue-500'/> 
          <h3 className='font-bold text-lg'>Osoby, które mogą Cię zainteresować</h3>
        </div>
        <div className='flex flex-col space-y-8'>
          {Array.from({ length: 4 }).map((_,i) => (
            <div 
              key={i}
              className='flex space-x-5 items-center'
            >
              <div className='bg-gray-300 w-10 h-10 rounded-full flex-none'></div>
              <div>
                <div className='text-gray-900 font-bold text-sm'>Jan Kowalski</div>
                <div className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi veniam officiis modi culpa.</div>
              </div>
            
              <button 
                className='transition ease-in-out flex space-x-2 items-center px-3 py-1.5
                border border-gray-400/50 rounded-3xl hover:scale-110
                  hover:bg-indigo-200 duration-300'
              >
                <div className='text-sm'>Obserwuj</div>
                <div>
                  <PiCursorClickDuotone className='text-md'/>
                </div>
              </button>
                
            </div>
          ))}
        </div>
      </div>
      <div className='sticky top-20'>
        <div className='flex space-x-2 items-center mt-3 mb-5'>
          <MdFavorite className='text-2xl text-red-400'/> 
          <h3 className='font-bold text-lg'>Zapisane posty</h3>
        </div>
        <div className='flex flex-col space-y-8'>
          {Array.from({ length: 5}).map((_,i) => (
            <div key={i} className='flex space-x-6 items-center group'>
              <div className='h-full w-2/5 rounded-xl bg-gray-300 aspect-square'></div>
              <div className='w-3/5 flex flex-col space-y-2'>
                <div className='text-lg font-semibold transition ease-in-out duration-200
                group-hover:-translate-y-2 hover:text-indigo-400'>
                  Lorem ipsum dolor sit amet consectetur.
                </div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam maxime modi amet voluptates vel.</div>
                <div className='flex space-x-2 items-center w-full'>
                  <div className='w-8 h-8 bg-gray-300 rounded-full flex-none'></div>
                  <div>Jan Kowalski  &#x2022;</div>
                  <div>22 mar 2022</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>

  )
}

export default SideSection