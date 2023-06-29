import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { MdFavorite } from 'react-icons/md'
import { PiCursorClickDuotone } from 'react-icons/pi'
import MainLayout from '~/layout/MainLayout'

const HomePage = () => {

  return (
    <MainLayout>
      <section className='grid grid-cols-12'>
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
            { Array.from({length: 5}).map((_,i) => (
              <div 
                key={i} 
                className='flex flex-col group space-y-4 border-b border-gray-300 
                pb-8 last:border-none'>
                {/* Article header part (author + date) */}  
                <div className='flex w-full items-center space-x-3'>
                  {/* Article author image */}
                  <div className='h-10 w-10 bg-gray-400 rounded-full flex-none'></div>
                  {/* Article author info and articte created date*/}
                  <div>
                    <p className='font-semibold'>Name author &#x2022; 22 mar 2022</p>
                    <p className='text-sm'>podróżnik bla bla</p>
                  </div>
                </div>
                {/* Article content part */}  
                <div className='grid grid-cols-12 w-full gap-4'>
                  <div className='col-span-8 flex flex-col space-y-4'>
                    <p className='transition ease-in-out duration-300 text-3xl font-bold
                     text-gray-800 group-hover:-translate-y-2 hover:text-indigo-400'>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    </p>
                    <p className='text-sm text-gray-500 breake-words'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                      Alias cumque asperiores iure nulla non, tenetur ipsam quam 
                      obcaecati laborum, veniam, inventore soluta eum voluptatem! 
                      Iste eius libero, qui magni veniam eligendi nostrum corrupti 
                      deserunt natus? Consectetur itaque optio voluptatum sed ratione, 
                      animi et? In, quasi dignissimos error dolores, nulla magnam 
                      dolorem velit laudantium ducimus facilis cupiditate, debitis 
                      ratione atque nobis.
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
              </div> 
            ))}
          </div>
          {/* Articles part end */}
        </main>
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
      </section>
    </MainLayout>
  )
}

export default HomePage