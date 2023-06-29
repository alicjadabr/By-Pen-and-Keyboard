import React from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { FaRegBell } from 'react-icons/fa'
import { BiEditAlt, BiSearch } from 'react-icons/bi'
import { HiOutlineChevronDown } from 'react-icons/hi'

const HomePage = () => {
  return (
    <div className='flex flex-col w-full h-screen'>
      
      <header className='h-20 w-full flex flex-row justify-around items-center
       bg-white border-b-[1px] border-gray-300'>

        <div>
          <IoReorderThreeOutline className='text-2xl text-gray-600'/>
        </div>

        <div className='font-thin text-xl'>Blog App</div>

        <div className='flex items-center space-x-2'>
          <div>
            <FaRegBell className='text-2xl text-gray-600'/>
          </div>
          <div>
            <div className='w-5 h-5 bg-gray-600 rounded-full'></div>
          </div>
          <div>
            <button className='flex items-center px-4 py-2 space-x-2 
            border border-gray-200 rounded-2xl transition hover:border-gray-900 
            hover: text-gray-900'>
              <div>Dodaj</div>
              <div>
                <BiEditAlt />
              </div>
            </button>
          </div>
        </div>

      </header>

      <section className='grid w-full h-full grid-cols-12 place-items-center'>
        <main className='col-span-8 border-r border-gray-300 h-full w-full px-24'>
          
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
              <div>Artykuły</div>
              <div>
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
                  <div className='h-10 w-10 bg-gray-400 rounded-full'></div>
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
        <aside className='col-span-4 w-full'>sidebar</aside>
      </section>

    </div>
  )
}

export default HomePage