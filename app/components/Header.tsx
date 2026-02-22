// 'use client'

// import { Menu, Search } from 'lucide-react'
// import { useSidebar } from './SidebarContext'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// export default function Header() {
//   const { setOpen } = useSidebar()

//   return (
//     <header className="h-14 border-b border-neutral-800 flex items-center gap-4 px-4">
      
//       {/* Mobile menu */}
//       <button className="md:hidden" onClick={() => setOpen(true)}>
//         <Menu />
//       </button>
//       <span className="hidden md:block font-semibold text-sm text-white">
//          Readify
//       </span>


//       {/* Search Bar */}
//       <div className="flex-1 max-w-xl mx-auto">
//         <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-4 py-2">
//           <Search size={18} className="text-neutral-400" />
//           <input
//             type="text"
//             placeholder="Search Readify"
//             className="bg-transparent outline-none text-sm text-white placeholder:text-neutral-400 w-full"
//           />
//         </div>
//       </div>

//       {/* Auth */}
//       <div className="flex items-center gap-3">
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </div>
//     </header>
//   )
// }
'use client'

import { Menu, Search, Plus } from 'lucide-react'
import { useSidebar } from './SidebarContext'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
  const { setOpen } = useSidebar()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-black border-b border-neutral-800 flex items-center gap-4 px-4">
      
      {/* Mobile menu */}
      <button className="md:hidden" onClick={() => setOpen(true)}>
        <Menu />
      </button>

      <span className="hidden md:block font-semibold text-sm text-white">
        Readify
      </span>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-4 py-2">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search Readify"
            className="bg-transparent outline-none text-sm text-white placeholder:text-neutral-400 w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <SignedIn>
          {/* ✅ CREATE POST BUTTON */}
          <Link
            href="/postcreate"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-500"
          >


            <Plus size={16} />
            Post
          </Link>

          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  )
}
