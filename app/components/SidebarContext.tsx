'use client'

import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext<any>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)



// 'use client'

// import { createContext, useContext, useState } from 'react'

// type SidebarContextType = {
//   showCreateCommunity: boolean
//   setShowCreateCommunity: (v: boolean) => void
// }

// const SidebarContext = createContext<SidebarContextType | null>(null)

// export function SidebarProvider({ children }: { children: React.ReactNode }) {
//   const [showCreateCommunity, setShowCreateCommunity] = useState(false)

//   return (
//     <SidebarContext.Provider
//       value={{ showCreateCommunity, setShowCreateCommunity }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   )
// }

// export function useSidebarContext() {
//   const ctx = useContext(SidebarContext)
//   if (!ctx) throw new Error('useSidebarContext must be used inside SidebarProvider')
//   return ctx
// }
