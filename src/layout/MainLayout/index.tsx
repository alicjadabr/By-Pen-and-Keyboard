import React, { type PropsWithChildren } from 'react'

import Header from '~/components/Header'
 
const MainLayout = ({ children }: PropsWithChildren) => {
  
  return (
    <div className='flex flex-col w-full h-full'>
      <Header />
      {children}
    </div>
  )
}
 
export default MainLayout