import React from 'react'
import Suggestions from '../Suggestions'
import Bookmarks from '../Bookmarks'


const SideSection = () => {
  return (
    <aside className='col-span-4 flex flex-col p-6 space-y-4'>
      <Suggestions />
      <Bookmarks />
    </aside>

  )
}

export default SideSection