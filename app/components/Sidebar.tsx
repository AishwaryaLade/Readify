// 'use client'

// import {
//   Home,
//   Flame,
//   TrendingUp,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from 'lucide-react'
// import { useState } from 'react'
// import { usePathname } from 'next/navigation'
// import clsx from 'clsx'

// import CreateCommunityModal from './CreateCommunityModal'
// import {useSidebar } from './SidebarContext'

// const mainMenu = [
//   { label: 'Home', icon: Home, href: '/' },
//   { label: 'Popular', icon: Flame, href: '/popular' },
//   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// ]

// const communities = ['reactjs', 'nextjs', 'webdev', 'programming']

// export default function Sidebar() {
//   const { open, setOpen, collapsed, setCollapsed } = useSidebar()
//   const pathname = usePathname()
//   const [createOpen, setCreateOpen] = useState(false)

//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Create Community Modal */}
//       {createOpen && (
//         <CreateCommunityModal
//           open={createOpen}
//           onClose={() => setCreateOpen(false)}
//         />
//       )}

//       <aside
//         className={clsx(
//           'fixed md:static z-50 h-full bg-black border-r border-neutral-800 transition-all duration-200',
//           collapsed ? 'w-16' : 'w-64',
//           open ? 'translate-x-0' : '-translate-x-full',
//           'md:translate-x-0'
//         )}
//       >
//         {/* Top */}
//         <div className="flex items-center justify-between p-3">
//           {!collapsed && <span className="font-semibold"></span>}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden md:block"
//           >
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>

//           <button onClick={() => setOpen(false)} className="md:hidden">
//             <X />
//           </button>
//         </div>

//         {/* Create community */}
//         {!collapsed && (
//           <button
//             onClick={() => setCreateOpen(true)}
//             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
//           >
//             <Plus size={18} /> Create Community
//           </button>
//         )}

//         {/* Main menu */}
//         <nav className="space-y-1">
//           {mainMenu.map(({ label, icon: Icon, href }) => {
//             const active = pathname === href
//             return (
//               <a
//                 key={label}
//                 href={href}
//                 className={clsx(
//                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
//                   active
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-neutral-800 text-neutral-300'
//                 )}
//               >
//                 <Icon size={20} />
//                 {!collapsed && <span>{label}</span>}
//               </a>
//             )
//           })}
//         </nav>

//         {/* Communities */}
//         {!collapsed && (
//           <div className="mt-6">
//             <p className="px-4 text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
//               Communities +
//             </p>

//             <div className="space-y-1">
//               {communities.map((c) => (
//                 <a
//                   key={c}
//                   href={`/r/${c}`}
//                   className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
//                 >
//                   r/{c}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </aside>
//     </>
//   )
// }
// // 'use client'

// // import {
// //   Home,
// //   Flame,
// //   TrendingUp,
// //   Plus,
// //   ChevronLeft,
// //   ChevronRight,
// //   X,
// // } from 'lucide-react'
// // import { useState } from 'react'
// // import { usePathname } from 'next/navigation'
// // import clsx from 'clsx'

// // import CreateCommunityModal from './CreateCommunityModal'

// // const mainMenu = [
// //   { label: 'Home', icon: Home, href: '/' },
// //   { label: 'Popular', icon: Flame, href: '/popular' },
// //   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// // ]

// // const communities = ['reactjs', 'nextjs', 'webdev', 'programming']

// // export default function Sidebar() {
// //   const pathname = usePathname()

// //   const [collapsed, setCollapsed] = useState(false)
// //   const [createOpen, setCreateOpen] = useState(false)

// //   return (
// //     <>
// //       {/* MODAL (ONLY opens on click) */}
// //       {createOpen && (
// //          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
// //                 <CreateCommunityModal
// //                  open={createOpen}
// //                  onClose={() => setCreateOpen(false)}
// //           />  
// //         </div>
// //       )}

// //       <aside
// //         className={clsx(
// //           'fixed md:static z-40 h-full bg-black border-r border-neutral-800 transition-all duration-200',
// //           collapsed ? 'w-16' : 'w-64'
// //         )}
// //       >
// //         {/* Top */}
// //         <div className="flex items-center justify-between p-3">
// //           <button
// //             onClick={() => setCollapsed(!collapsed)}
// //             className="hidden md:block"
// //           >
// //             {collapsed ? <ChevronRight /> : <ChevronLeft />}
// //           </button>
// //         </div>

// //         {/* CREATE COMMUNITY BUTTON */}
// //         {!collapsed && (
// //           <button
// //             onClick={() => setCreateOpen(true)}
// //             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
// //           >
// //             <Plus size={18} />  Create Community
// //           </button>
// //         )}

// //         {/* MAIN MENU */}
// //         <nav className="space-y-1">
// //           {mainMenu.map(({ label, icon: Icon, href }) => {
// //             const active = pathname === href
// //             return (
// //               <a
// //                 key={label}
// //                 href={href}
// //                 className={clsx(
// //                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
// //                   active
// //                     ? 'bg-blue-600 text-white'
// //                     : 'hover:bg-neutral-800 text-neutral-300'
// //                 )}
// //               >
// //                 <Icon size={20} />
// //                 {!collapsed && <span>{label}</span>}
// //               </a>
// //             )
// //           })}
// //         </nav>

// //         {/* COMMUNITIES */}
// //         {!collapsed && (
// //           <div className="mt-6">
// //             <p className="px-4 text-sm font-semibold uppercase text-neutral-400 mb-2">
// //               Communities
// //             </p>

// //             {communities.map((c) => (
// //               <a
// //                 key={c}
// //                 href={`/r/${c}`}
// //                 className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
// //               >
// //                 r/{c}
// //               </a>
// //             ))}
// //           </div>
// //         )}
// //       </aside>
// //     </>
// //   )
// // }
// 'use client'

// import {
//   Home,
//   Flame,
//   TrendingUp,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from 'lucide-react'
// import { useState } from 'react'
// import { usePathname } from 'next/navigation'
// import clsx from 'clsx'

// import CreateCommunityModal from './CreateCommunityModal'
// import {useSidebar } from './SidebarContext'

// const mainMenu = [
//   { label: 'Home', icon: Home, href: '/' },
//   { label: 'Popular', icon: Flame, href: '/popular' },
//   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// ]

// const communities = ['reactjs', 'nextjs', 'webdev', 'programming']

// export default function Sidebar() {
//   const { open, setOpen, collapsed, setCollapsed } = useSidebar()
//   const pathname = usePathname()
//   const [createOpen, setCreateOpen] = useState(false)

//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Create Community Modal */}
//       {createOpen && (
//         <CreateCommunityModal
//           open={createOpen}
//           onClose={() => setCreateOpen(false)}
//         />
//       )}

//       <aside
//         className={clsx(
//           'fixed md:static z-50 h-full bg-black border-r border-neutral-800 transition-all duration-200',
//           collapsed ? 'w-16' : 'w-64',
//           open ? 'translate-x-0' : '-translate-x-full',
//           'md:translate-x-0'
//         )}
//       >
//         {/* Top */}
//         <div className="flex items-center justify-between p-3">
//           {!collapsed && <span className="font-semibold"></span>}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden md:block"
//           >
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>

//           <button onClick={() => setOpen(false)} className="md:hidden">
//             <X />
//           </button>
//         </div>

//         {/* Create community */}
//         {!collapsed && (
//           <button
//             onClick={() => setCreateOpen(true)}
//             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
//           >
//             <Plus size={18} /> Create Community
//           </button>
//         )}

//         {/* Main menu */}
//         <nav className="space-y-1">
//           {mainMenu.map(({ label, icon: Icon, href }) => {
//             const active = pathname === href
//             return (
//               <a
//                 key={label}
//                 href={href}
//                 className={clsx(
//                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
//                   active
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-neutral-800 text-neutral-300'
//                 )}
//               >
//                 <Icon size={20} />
//                 {!collapsed && <span>{label}</span>}
//               </a>
//             )
//           })}
//         </nav>

//         {/* Communities */}
//         {!collapsed && (
//           <div className="mt-6">
//             <p className="px-4 text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
//               Communities +
//             </p>

//             <div className="space-y-1">
//               {communities.map((c) => (
//                 <a
//                   key={c}
//                   href={`/r/${c}`}
//                   className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
//                 >
//                   r/{c}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </aside>
//     </>
//   )
// }
// // 'use client'

// // import {
// //   Home,
// //   Flame,
// //   TrendingUp,
// //   Plus,
// //   ChevronLeft,
// //   ChevronRight,
// //   X,
// // } from 'lucide-react'
// // import { useState } from 'react'
// // import { usePathname } from 'next/navigation'
// // import clsx from 'clsx'

// // import CreateCommunityModal from './CreateCommunityModal'

// // const mainMenu = [
// //   { label: 'Home', icon: Home, href: '/' },
// //   { label: 'Popular', icon: Flame, href: '/popular' },
// //   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// // ]

// // const communities = ['reactjs', 'nextjs', 'webdev', 'programming']

// // export default function Sidebar() {
// //   const pathname = usePathname()

// //   const [collapsed, setCollapsed] = useState(false)
// //   const [createOpen, setCreateOpen] = useState(false)

// //   return (
// //     <>
// //       {/* MODAL (ONLY opens on click) */}
// //       {createOpen && (
// //          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
// //                 <CreateCommunityModal
// //                  open={createOpen}
// //                  onClose={() => setCreateOpen(false)}
// //           />  
// //         </div>
// //       )}

// //       <aside
// //         className={clsx(
// //           'fixed md:static z-40 h-full bg-black border-r border-neutral-800 transition-all duration-200',
// //           collapsed ? 'w-16' : 'w-64'
// //         )}
// //       >
// //         {/* Top */}
// //         <div className="flex items-center justify-between p-3">
// //           <button
// //             onClick={() => setCollapsed(!collapsed)}
// //             className="hidden md:block"
// //           >
// //             {collapsed ? <ChevronRight /> : <ChevronLeft />}
// //           </button>
// //         </div>

// //         {/* CREATE COMMUNITY BUTTON */}
// //         {!collapsed && (
// //           <button
// //             onClick={() => setCreateOpen(true)}
// //             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
// //           >
// //             <Plus size={18} />  Create Community
// //           </button>
// //         )}

// //         {/* MAIN MENU */}
// //         <nav className="space-y-1">
// //           {mainMenu.map(({ label, icon: Icon, href }) => {
// //             const active = pathname === href
// //             return (
// //               <a
// //                 key={label}
// //                 href={href}
// //                 className={clsx(
// //                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
// //                   active
// //                     ? 'bg-blue-600 text-white'
// //                     : 'hover:bg-neutral-800 text-neutral-300'
// //                 )}
// //               >
// //                 <Icon size={20} />
// //                 {!collapsed && <span>{label}</span>}
// //               </a>
// //             )
// //           })}
// //         </nav>

// //         {/* COMMUNITIES */}
// //         {!collapsed && (
// //           <div className="mt-6">
// //             <p className="px-4 text-sm font-semibold uppercase text-neutral-400 mb-2">
// //               Communities
// //             </p>

// //             {communities.map((c) => (
// //               <a
// //                 key={c}
// //                 href={`/r/${c}`}
// //                 className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
// //               >
// //                 r/{c}
// //               </a>
// //             ))}
// //           </div>
// //         )}
// //       </aside>
// //     </>
// //   )
// // }
// 'use client'

// import {
//   Home,
//   Flame,
//   TrendingUp,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from 'lucide-react'
// import { useState } from 'react'
// import { usePathname } from 'next/navigation'
// import clsx from 'clsx'

// import CreateCommunityModal from './CreateCommunityModal'
// import {useSidebar } from './SidebarContext'

// const mainMenu = [
//   { label: 'Home', icon: Home, href: '/' },
//   { label: 'Popular', icon: Flame, href: '/popular' },
//   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// ]

// const communities = ['reactjs', 'nextjs', 'webdev', 'programming']

// export default function Sidebar() {
//   const { open, setOpen, collapsed, setCollapsed } = useSidebar()
//   const pathname = usePathname()
//   const [createOpen, setCreateOpen] = useState(false)

//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Create Community Modal */}
//       {createOpen && (
//         <CreateCommunityModal
//           open={createOpen}
//           onClose={() => setCreateOpen(false)}
//         />
//       )}

//       <aside
//         className={clsx(
//           'fixed md:static z-50 h-full bg-black border-r border-neutral-800 transition-all duration-200',
//           collapsed ? 'w-16' : 'w-64',
//           open ? 'translate-x-0' : '-translate-x-full',
//           'md:translate-x-0'
//         )}
//       >
//         {/* Top */}
//         <div className="flex items-center justify-between p-3">
//           {!collapsed && <span className="font-semibold"></span>}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden md:block"
//           >
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>

//           <button onClick={() => setOpen(false)} className="md:hidden">
//             <X />
//           </button>
//         </div>

//         {/* Create community */}
//         {!collapsed && (
//           <button
//             onClick={() => setCreateOpen(true)}
//             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
//           >
//             <Plus size={18} /> Create Community
//           </button>
//         )}

//         {/* Main menu */}
//         <nav className="space-y-1">
//           {mainMenu.map(({ label, icon: Icon, href }) => {
//             const active = pathname === href
//             return (
//               <a
//                 key={label}
//                 href={href}
//                 className={clsx(
//                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
//                   active
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-neutral-800 text-neutral-300'
//                 )}
//               >
//                 <Icon size={20} />
//                 {!collapsed && <span>{label}</span>}
//               </a>
//             )
//           })}
//         </nav>

//         {/* Communities */}
//         {!collapsed && (
//           <div className="mt-6">
//             <p className="px-4 text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
//               Communities +
//             </p>

//             <div className="space-y-1">
//               {communities.map((c) => (
//                 <a
//                   key={c}
//                   href={`/r/${c}`}
//                   className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
//                 >
//                   r/{c}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </aside>
//     </>
//   )

// 'use client'

// import {
//   Home,
//   Flame,
//   TrendingUp,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from 'lucide-react'
// import { useState } from 'react'
// import { usePathname } from 'next/navigation'
// import clsx from 'clsx'

// import CreateCommunityModal from './CreateCommunityModal'

// const mainMenu = [
//   { label: 'Home', icon: Home, href: '/' },
//   { label: 'Popular', icon: Flame, href: '/popular' },
//   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// ]

// const communities = ['reactjs', 'nextjs', 'webdev', 'programming']

// export default function Sidebar() {
//   const pathname = usePathname()

//   const [collapsed, setCollapsed] = useState(false)
//   const [createOpen, setCreateOpen] = useState(false)

//   return (
//     <>
//       {/* MODAL (ONLY opens on click) */}
//       {createOpen && (
//          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//                 <CreateCommunityModal
//                  open={createOpen}
//                  onClose={() => setCreateOpen(false)}
//           />  
//         </div>
//       )}

//       <aside
//         className={clsx(
//           'fixed md:static z-40 h-full bg-black border-r border-neutral-800 transition-all duration-200',
//           collapsed ? 'w-16' : 'w-64'
//         )}
//       >
//         {/* Top */}
//         <div className="flex items-center justify-between p-3">
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden md:block"
//           >
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>
//         </div>

//         {/* CREATE COMMUNITY BUTTON */}
//         {!collapsed && (
//           <button
//             onClick={() => setCreateOpen(true)}
//             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
//           >
//             <Plus size={18} />  Create Community
//           </button>
//         )}

//         {/* MAIN MENU */}
//         <nav className="space-y-1">
//           {mainMenu.map(({ label, icon: Icon, href }) => {
//             const active = pathname === href
//             return (
//               <a
//                 key={label}
//                 href={href}
//                 className={clsx(
//                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
//                   active
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-neutral-800 text-neutral-300'
//                 )}
//               >
//                 <Icon size={20} />
//                 {!collapsed && <span>{label}</span>}
//               </a>
//             )
//           })}
//         </nav>

//         {/* COMMUNITIES */}
//         {!collapsed && (
//           <div className="mt-6">
//             <p className="px-4 text-sm font-semibold uppercase text-neutral-400 mb-2">
//               Communities
//             </p>

//             {communities.map((c) => (
//               <a
//                 key={c}
//                 href={`/r/${c}`}
//                 className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
//               >
//                 r/{c}
//               </a>
//             ))}
//           </div>
//         )}
//       </aside>
//     </>
//   )
// }


// 'use client'

// import {
//   Home,
//   Flame,
//   TrendingUp,
//   Plus,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from 'lucide-react'
// import { useState, useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import clsx from 'clsx'

// import CreateCommunityModal from './CreateCommunityModal'
// import { useSidebar } from './SidebarContext'

// const mainMenu = [
//   { label: 'Home', icon: Home, href: '/' },
//   { label: 'Popular', icon: Flame, href: '/popular' },
//   { label: 'Trending', icon: TrendingUp, href: '/trending' },
// ]

// type Community = {
//   _id: string
//   name: string
//   slug: string
// }

// export default function Sidebar() {
//   const { open, setOpen, collapsed, setCollapsed } = useSidebar()
//   const pathname = usePathname()
//   const [createOpen, setCreateOpen] = useState(false)

//   // 🔹 communities from Sanity
//   const [communities, setCommunities] = useState<Community[]>([])
//   const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   async function fetchCommunities() {
  //     try {
  //       const res = await fetch('/api/community')
  //       const data = await res.json()
  //       setCommunities(data)
  //     } catch (err) {
  //       console.error('Failed to load communities')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchCommunities()
  // }, [])
//       useEffect(() => {
//   async function load() {
//     try {
//       const res = await fetch('/api/community')
//       const data = await res.json()
//       setCommunities(data)
//     } catch (err) {
//       console.error('Failed to load communities')
//     }
//   }

//   load()

//   // 🔔 Listen for community creation
//   window.addEventListener('community-created', load)

//   return () => {
//     window.removeEventListener('community-created', load)
//   }
// }, [])


//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Create Community Modal */}
//       {createOpen && (
//         <CreateCommunityModal
//           open={createOpen}
//           onClose={() => setCreateOpen(false)}
//         />
//       )}

//       <aside
//         className={clsx(
//           'fixed md:static z-50 h-full bg-black border-r border-neutral-800 transition-all duration-200',
//           collapsed ? 'w-16' : 'w-64',
//           open ? 'translate-x-0' : '-translate-x-full',
//           'md:translate-x-0'
//         )}
//       >
//         {/* Top */}
//         <div className="flex items-center justify-between p-3">
//           {!collapsed && <span className="font-semibold"></span>}

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden md:block"
//           >
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </button>

//           <button onClick={() => setOpen(false)} className="md:hidden">
//             <X />
//           </button>
//         </div>

//         {/* Create community button */}
//         {!collapsed && (
//           <button
//             onClick={() => setCreateOpen(true)}
//             className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
//           >
//             <Plus size={18} /> Create Community
//           </button>
//         )}

//         {/* Main menu */}
//         <nav className="space-y-1">
//           {mainMenu.map(({ label, icon: Icon, href }) => {
//             const active = pathname === href
//             return (
//               <a
//                 key={label}
//                 href={href}
//                 className={clsx(
//                   'flex items-center gap-3 px-3 py-2 mx-2 rounded',
//                   active
//                     ? 'bg-blue-600 text-white'
//                     : 'hover:bg-neutral-800 text-neutral-300'
//                 )}
//               >
//                 <Icon size={20} />
//                 {!collapsed && <span>{label}</span>}
//               </a>
//             )
//           })}
//         </nav>

//         {/* Communities */}
//         {!collapsed && (
//           <div className="mt-6">
//             <p className="px-4 text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
//               Communities +
//             </p>

//             {loading ? (
//               <p className="px-4 text-sm text-neutral-500">Loading...</p>
//             ) : communities.length === 0 ? (
//               <p className="px-4 text-sm text-neutral-500">
//                 No communities yet
//               </p>
//             ) : (
//               <div className="space-y-1">
//                 {communities.map((c) => (
//                   <a
//                     key={c._id}
//                     href={`/r/${c.slug}`}
//                     className="block px-4 py-1.5 text-sm rounded hover:bg-neutral-800 text-neutral-300"
//                   >
//                     r/{c.slug}
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </aside>
//     </>
//   )
// }
'use client'

import {
  Home,
  Flame,
  TrendingUp,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'

import { useSidebar } from './SidebarContext'
import CommunityJoinButton from './CommunityJoinButton'

const mainMenu = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Popular', icon: Flame, href: '/popular' },
  { label: 'Trending', icon: TrendingUp, href: '/trending' },
]

type Community = {
  _id: string
  name: string
  slug: string
}

export default function Sidebar() {
  const { open, setOpen, collapsed, setCollapsed } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()

  // 🔹 communities from Sanity
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/community')
        const data = await res.json()
        setCommunities(data)
      } catch (err) {
        console.error('Failed to load communities')
      } finally {
        setLoading(false)
      }
    }

    load()

    // 🔔 refresh list after creating community
    window.addEventListener('community-created', load)
    return () => window.removeEventListener('community-created', load)
  }, [])

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed md:static z-50 h-full bg-black border-r border-neutral-800 transition-all duration-200',
          collapsed ? 'w-16' : 'w-64',
          open ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-3">
          

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

          <button onClick={() => setOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        {/* ✅ Create community → PAGE navigation */}
        {!collapsed && (
          <button
            onClick={() => {
              setOpen(false)
              router.push('/createcommunity')
            }}
            className="flex items-center gap-2 mx-2 mb-4 px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
          >
            <Plus size={18} />
            Create Community
          </button>
        )}

        {/* Main menu */}
        <nav className="space-y-1">
          {mainMenu.map(({ label, icon: Icon, href }) => {
            const active = pathname === href
            return (
              <button
                key={label}
                onClick={() => {
                  setOpen(false)
                  router.push(href)
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2 mx-2 rounded text-left',
                  active
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-neutral-800 text-neutral-300'
                )}
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Communities */}
        {!collapsed && (
          <div className="mt-6">
            <p className="px-4 text-sm font-semibold uppercase tracking-wide text-neutral-400 mb-2">
              Communities
            </p>

            {loading ? (
              <p className="px-4 text-sm text-neutral-500">Loading...</p>
            ) : communities.length === 0 ? (
              <p className="px-4 text-sm text-neutral-500">
                No communities yet
              </p>
            ) : (
              <div className="space-y-1">
                {communities.map((c) => (
  <div
    key={c._id}
    className="flex items-center justify-between px-4 py-1.5 rounded hover:bg-neutral-800"
  >
    <button
      onClick={() => {
        setOpen(false)
        router.push(`/r/${c.slug}`)
      }}
      className="text-sm text-neutral-300"
    >
      r/{c.slug}
    </button>

    {/* ✅ JOIN / LEAVE BUTTON */}
    <CommunityJoinButton communityId={c._id} />
  </div>
))}

              </div>
            )}
          </div>
        )}
      </aside>
    </>
  )
}
