

'use client'

import { useEffect } from "react"              // ✅ ADD
import { useUser } from "@clerk/nextjs"        // ✅ ADD

import Header from './Header'
import Sidebar from './Sidebar'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // ✅ ADD (Clerk user state)
  const { isSignedIn, isLoaded } = useUser()

  // ✅ ADD (Sanity sync – ONE TIME on login)
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetch("/api/sync-user", {
        method: "POST",
        credentials: "include",
      })
    }
  }, [isLoaded, isSignedIn])

  // ⬇️ ⬇️ ⬇️ ⬇️
  // ⬇️ NOTHING BELOW IS CHANGED ⬇️
  // ⬇️ ⬇️ ⬇️ ⬇️

  return (
    <>
      <Header />

      <div className="pt-16 flex">
        <aside className="fixed left-0 top-16 w-[260px] h-[calc(100vh-64px)] border-r border-neutral-800 overflow-y-auto">
          <Sidebar />
        </aside>

        <main className="ml-[310px] flex-1 px-4 py-10">
          <div className="w-full max-w-4xl ">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
