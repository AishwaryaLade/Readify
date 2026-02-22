// 'use client'

// import { useState } from 'react'

// export default function CreateCommunityModal() {
//   const [name, setName] = useState('')
//   const [slug, setSlug] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState<File | null>(null)

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   function generateSlug(value: string) {
//     return value
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)+/g, '')
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError('')
//     setSuccess('')
//     setLoading(true)

//     try {
//       const formData = new FormData()
//       formData.append('name', name)
//       formData.append('slug', slug)
//       formData.append('description', description)
//       if (image) formData.append('image', image)

//       const res = await fetch('/api/community', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.error || 'Failed to create community')
//       }

//       setSuccess('Community created successfully')
//       setName('')
//       setSlug('')
//       setDescription('')
//       setImage(null)
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-md rounded-xl bg-zinc-900 p-6 text-white">
//       <h2 className="text-xl font-semibold mb-1">Create Community</h2>
//       <p className="text-sm text-zinc-400 mb-4">
//         Create a community/subread to share ideas and get feedback.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="text-sm">Community Name</label>
//           <input
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value)
//               setSlug(generateSlug(e.target.value))
//             }}
//             className="mt-1 w-full rounded-md bg-zinc-800 px-3 py-2 outline-none"
//             placeholder="My Community"
//             required
//           />
//         </div>

//         {/* Slug */}
//         <div>
//           <label className="text-sm">Community Slug (URL)</label>
//           <input
//             value={slug}
//             onChange={(e) => setSlug(generateSlug(e.target.value))}
//             className="mt-1 w-full rounded-md bg-zinc-800 px-3 py-2 outline-none"
//             placeholder="my-community"
//             required
//           />
//           <p className="text-xs text-zinc-400 mt-1">
//             readify.com/community/{slug || 'community-slug'}
//           </p>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="text-sm">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="mt-1 w-full rounded-md bg-zinc-800 px-3 py-2 outline-none"
//             placeholder="What is this community about?"
//             rows={3}
//           />
//         </div>

//         {/* Image */}
//         <div>
//           <label className="text-sm">Community Image (optional)</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files?.[0] || null)}
//             className="mt-1 block w-full text-sm"
//           />
//         </div>

//         {/* Messages */}
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         {success && <p className="text-green-500 text-sm">{success}</p>}

//         {/* Button */}
//         <button
//           disabled={loading}
//           className="w-full rounded-md bg-teal-600 py-2 font-medium hover:bg-teal-700 disabled:opacity-50"
//         >
//           {loading ? 'Creating...' : 'Create Community'}
//         </button>
//       </form>
//     </div>
//   )
// }

// recent

// 'use client'

// import { useState } from 'react'
// import { X } from 'lucide-react'

// type Props = {
//   open: boolean
//   onClose: () => void
// }

// export default function CreateCommunityModal({ open, onClose }: Props) {
//   if (!open) return null // ✅ THIS IS THE KEY

//   const [name, setName] = useState('')
//   const [slug, setSlug] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState<File | null>(null)

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   function generateSlug(value: string) {
//     return value
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)+/g, '')
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError('')
//     setSuccess('')
//     setLoading(true)

//     try {
//       const formData = new FormData()
//       formData.append('name', name)
//       formData.append('slug', slug)
//       formData.append('description', description)
//       if (image) formData.append('image', image)

//       const res = await fetch('/api/community', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error)

//       setSuccess('Community created successfully')
//       setName('')
//       setSlug('')
//       setDescription('')
//       setImage(null)

//       onClose() // ✅ CLOSE AFTER SUCCESS
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="relative max-w-md rounded-xl bg-zinc-900 p-6 text-white">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-zinc-400 hover:text-white"
//         >
//           <X />
//         </button>

//         <h2 className="text-xl font-semibold mb-1">Create Community</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value)
//               setSlug(generateSlug(e.target.value))
//             }}
//             className="w-full rounded bg-zinc-800 px-3 py-2"
//             placeholder="Community name"
//           />

//           <input
//             value={slug}
//             onChange={(e) => setSlug(generateSlug(e.target.value))}
//             className="w-full rounded bg-zinc-800 px-3 py-2"
//             placeholder="community-slug"
//           />

//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full rounded bg-zinc-800 px-3 py-2"
//             placeholder="What is this community about?"
//           />

//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files?.[0] || null)}
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             disabled={loading}
//             className="w-full rounded bg-teal-600 py-2"
//           >
//             {loading ? 'Creating...' : 'Create Community'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }
// 'use client'

// import { useState } from 'react'

// export default function CreateCommunityForm() {
//   const [name, setName] = useState('')
//   const [slug, setSlug] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState<File | null>(null)

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   function generateSlug(value: string) {
//     return value
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)+/g, '')
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setError('')
//     setSuccess('')
//     setLoading(true)

//     try {
//       const formData = new FormData()
//       formData.append('name', name)
//       formData.append('slug', slug)
//       formData.append('description', description)
//       if (image) formData.append('image', image)

//       const res = await fetch('/api/community', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || 'Failed')

//       setSuccess('Community created successfully')
//       setName('')
//       setSlug('')
//       setDescription('')
//       setImage(null)
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 text-white">
//       <h2 className="text-xl font-semibold mb-4">Create Community</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value)
//             setSlug(generateSlug(e.target.value))
//           }}
//           className="w-full rounded bg-zinc-800 px-3 py-2"
//           placeholder="Community name"
//           required
//         />

//         <input
//           value={slug}
//           onChange={(e) => setSlug(generateSlug(e.target.value))}
//           className="w-full rounded bg-zinc-800 px-3 py-2"
//           placeholder="community-slug"
//           required
//         />

//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full rounded bg-zinc-800 px-3 py-2"
//           placeholder="What is this community about?"
//           rows={3}
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//         />

//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         {success && <p className="text-green-500 text-sm">{success}</p>}

//         <button
//           disabled={loading}
//           className="w-full rounded bg-teal-600 py-2"
//         >
//           {loading ? 'Creating...' : 'Create Community'}
//         </button>
//       </form>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'

export default function CreateCommunityForm() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)
    formData.append('description', description)
    if (image) formData.append('image', image)

    await fetch('/api/community', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div className=" shadow-lg relative w-full max-w-2xl rounded-2xl bg-neutral-900 p-8 text-white min-h-[520px]">

      <h2 className="text-xl font-semibold mb-4">Create Community</h2>

      <form onSubmit={handleSubmit} className="space-y-9">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setSlug(generateSlug(e.target.value))
          }}
          className="w-full rounded bg-zinc-800 px-3 py-3"
          placeholder="Community name"
          required
        />

        <input
          value={slug}
          onChange={(e) => setSlug(generateSlug(e.target.value))}
          className="w-full rounded bg-zinc-800 px-3 py-2"
          placeholder="community-slug"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded bg-zinc-800 px-3 py-2"
          placeholder="Description"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button className="w-full rounded bg-teal-600 py-3">
          Create Community
        </button>
      </form>
    </div>
  )
}

