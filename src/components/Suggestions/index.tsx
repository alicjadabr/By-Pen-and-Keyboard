import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { PiCursorClickDuotone } from 'react-icons/pi'

const Suggestions = () => {
  return (
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
  )
}

export default Suggestions