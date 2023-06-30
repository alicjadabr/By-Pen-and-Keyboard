import React, { createContext, useState, type PropsWithChildren } from 'react'

type GlobalContextType = {
  isWriteModalOpen: boolean
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<{
  isWriteModalOpen: boolean
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}>(null as unknown as GlobalContextType)

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        isWriteModalOpen,
        setIsWriteModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider