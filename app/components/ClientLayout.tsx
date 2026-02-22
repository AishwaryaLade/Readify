// import Header from "./Header"
// import Sidebar from "./Sidebar"

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">

//       {/* HEADER */}
//       <Header />

//       {/* BODY */}
//       <div className="flex flex-1">

//         {/* SIDEBAR */}
//           <aside className="w-[260px] border-r border-neutral-800">
//             <Sidebar />
//           </aside>  
//         {/* POSTS — LEFT ALIGNED */}
//         <main className="flex-1 px-6 py-6">
//           <div className="mx-auto max-w-2xl">
//             {children}
//           </div>
//         </main>


//       </div>
//     </div>
//   )
// }
// "use client"

// import Header from "./Header"
// import Sidebar from "./Sidebar"

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <>
//       {/* HEADER */}
//       <Header />

//       {/* BODY */}
//       <div className="pt-16 flex">

//         {/* SIDEBAR */}
//         <aside className="fixed left-0 top-16 w-[260px] h-[calc(100vh-64px)] border-r border-neutral-800 overflow-y-auto">
//           <Sidebar />
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="ml-[310px] flex-1 flex justify-start px-4 py-6">
//           <div className="w-full max-w-2xl space-y-6">
//             {children}
//           </div>
//         </main>

//       </div>
//     </>
//   )
// }
// 'use client'

// import Header from './Header'
// import Sidebar from './Sidebar'

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <>
//       <Header />

//       <div className="pt-16 flex">
//         <aside className="fixed left-0 top-16 w-[260px] h-[calc(100vh-64px)] border-r border-neutral-800 overflow-y-auto">
//           <Sidebar />
//         </aside>

//         <main className="ml-[310px] flex-1 px-4 py-10">
//           <div className="w-full max-w-4xl ">
//             {children}
//           </div>
//         </main>
//       </div>
//     </>
//   )
// }

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
