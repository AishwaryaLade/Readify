// "use client"

// import { useEffect, useState } from "react"
// import { useUser } from "@clerk/nextjs"



// export default function CreatePostPage() {
//   const { user } = useUser()

//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [communityId, setCommunityId] = useState("")
//   const [postDate, setPostDate] = useState("")
//   const [communities, setCommunities] = useState([])
//   const [mediaFiles, setMediaFiles] = useState<File[]>([])


//   useEffect(() => {
//     fetch("/api/community")
//       .then(res => res.json())
//       .then(data => setCommunities(data))
//   }, [])

//   const handleCreate = async () => {
//     if (!communityId) {
//       alert("Please select a community")
//       return
//     }

//     await fetch("/api/create-post", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         content,
//         communityId,
//         postDate,
//         clerkId: user?.id,
//         media: [],
//       }),
//     })

//     alert("Post created")
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-10 space-y-4">
//       <h1 className="text-xl font-bold">Create Post</h1>

//       <input
//         className="w-full p-2 bg-neutral-800 rounded"
//         placeholder="Title"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />

//       <textarea
//         className="w-full p-2 bg-neutral-800 rounded"
//         placeholder="Content"
//         value={content}
//         onChange={e => setContent(e.target.value)}
//       />

//       <select
//         className="w-full p-2 bg-neutral-800 rounded"
//         value={communityId}
//         onChange={e => setCommunityId(e.target.value)}
//       >
//         <option value="">Select Community</option>
//         {communities.map((c: any) => (
//           <option key={c._id} value={c._id}>
//             {c.title}
//           </option>
//         ))}
//       </select>
//       <input
//         type="file"
//         multiple
//         accept="image/*,video/*"
//         onChange={e => setMediaFiles(Array.from(e.target.files || []))}
//         />


//       <input
//         type="datetime-local"
//         className="w-full p-2 bg-neutral-800 rounded"
//         value={postDate}
//         onChange={e => setPostDate(e.target.value)}
//       />

//       <button
//         onClick={handleCreate}
//         className="px-4 py-2 bg-white text-black rounded"
//       >
//         Create
//       </button>
//     </div>
//   )
// }





// "use client"

// import { useEffect, useState } from "react"
// import { useUser } from "@clerk/nextjs"

// export default function CreatePostPage() {
//   const { user } = useUser()
//   const [communities, setCommunities] = useState<any[]>([])
//   const [communityId, setCommunityId] = useState("")

//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [postDate, setPostDate] = useState("")
//   const [media, setMedia] = useState<File | null>(null)

//   useEffect(() => {
//     fetch("/api/community")
//       .then(res => res.json())
//       .then(data => setCommunities(data))
//   }, [])

//   const handleSubmit = async () => {
//     const formData = new FormData()

//     formData.append("title", title)
//     formData.append("content", content)
//     formData.append("communityId", communityId)
//     formData.append("postDate", postDate)
//     formData.append("clerkId", user!.id)

//     if (media) {
//       formData.append("media", media)
//     }

//     await fetch("/api/create-post", {
//       method: "POST",
//       body: formData,
//     })

//     alert("Post created")
//   }

//   return (
//     <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 p-8 text-white min-h-[520px]">
    
//       <div className="w-full max-w-3xl bg-neutral-900 p-2 rounded-2xl shadow-lg space-y-3">

//         <h1 className="text-2xl font-semibold text-white">
//           Create Post
//         </h1>

//         <input
//           placeholder="Title"
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-teal-600"
//           onChange={e => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Content"
//           rows={5}
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-teal-600"
//           onChange={e => setContent(e.target.value)}
//         />

//         {/* <select
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
//           value={communityId}
//           onChange={e => setCommunityId(e.target.value)}
//         >
//           <option value="">Select community</option>
//           {communities.map(c => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select> */}
//         <select
//   className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
//   value={communityId}
//   onChange={e => setCommunityId(e.target.value)}
// >
//   <option value="">Select community</option>
//   {communities.map(c => (
//     <option key={c._id} value={c._id}>
//       {c.name}
//     </option>
//   ))}
// </select>

//         <input
//           type="datetime-local"
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
//           onChange={e => setPostDate(e.target.value)}
//         />

//         <input
//           type="file"
//           accept="image/*,video/*"
//           className="w-full text-sm text-neutral-300"
//           onChange={e => setMedia(e.target.files?.[0] || null)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition"
//         >
//           Create Post
//         </button>
//       </div>
//     </div>
//   )
// }
// "use client"

// import { useEffect, useState } from "react"
// import { useUser } from "@clerk/nextjs"

// export default function CreatePostPage() {
//   const { user } = useUser()
//   const [communities, setCommunities] = useState<any[]>([])
//   const [communityId, setCommunityId] = useState("")

//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [postDate, setPostDate] = useState("")
//   const [media, setMedia] = useState<File | null>(null)

//   // ✅ Only change here
//   useEffect(() => {
//     fetch("/api/community/user-joined")
//       .then(res => res.json())
//       .then(data => {
//         const joined = data.communities || [];
//         setCommunities(joined);

//         if (joined.length > 0) {
//           setCommunityId(joined[0]._id);
//         }
//       });
//   }, []);

//   const handleSubmit = async () => {
//     const formData = new FormData()

//     formData.append("title", title)
//     formData.append("content", content)
//     formData.append("communityId", communityId)
//     formData.append("postDate", postDate)
//     formData.append("clerkId", user!.id)

//     if (media) {
//       formData.append("media", media)
//     }

//     await fetch("/api/create-post", {
//       method: "POST",
//       body: formData,
//     })

//     alert("Post created")
//   }

//   return (
//     <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 p-8 text-white min-h-[520px]">
//       <div className="w-full max-w-3xl bg-neutral-900 p-2 rounded-2xl shadow-lg space-y-3">

//         <h1 className="text-2xl font-semibold text-white">
//           Create Post
//         </h1>

//         <input
//           placeholder="Title"
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-teal-600"
//           onChange={e => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Content"
//           rows={5}
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-teal-600"
//           onChange={e => setContent(e.target.value)}
//         />

//         <select
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
//           value={communityId}
//           onChange={e => setCommunityId(e.target.value)}
//         >
//           <option value="">Select community</option>
//           {communities.map(c => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="datetime-local"
//           className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
//           onChange={e => setPostDate(e.target.value)}
//         />

//         <input
//           type="file"
//           accept="image/*,video/*"
//           className="w-full text-sm text-neutral-300"
//           onChange={e => setMedia(e.target.files?.[0] || null)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition"
//         >
//           Create Post
//         </button>

//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function CreatePostPage() {
  const { user } = useUser()
  const [communities, setCommunities] = useState<{ communityId: string; name: string }[]>([])
  const [communityId, setCommunityId] = useState("")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [postDate, setPostDate] = useState("")
  const [media, setMedia] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Load communities the user joined
  useEffect(() => {
    fetch("/api/community/user-joined", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        const joined: { communityId: string; name: string }[] = data.communities || []
        setCommunities(joined)
        if (joined.length > 0) setCommunityId(joined[0].communityId)
      })
      .catch(err => {
        console.error("Failed to fetch joined communities", err)
      })
  }, [])

  const handleSubmit = async () => {
    if (!title || !content || !communityId) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("communityId", communityId)
      formData.append("postDate", postDate || "")
      formData.append("clerkId", user!.id)
      if (media) formData.append("media", media)

      const res = await fetch("/api/create-post", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      alert("Post created successfully!")
      setTitle("")
      setContent("")
      setMedia(null)
      setPostDate("")
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 p-8 text-white min-h-[520px]">
      <div className="w-full max-w-3xl bg-neutral-900 p-2 rounded-2xl shadow-lg space-y-3">
        <h1 className="text-2xl font-semibold text-white">Create Post</h1>

        <input
          placeholder="Title"
          className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-teal-600"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          rows={5}
          className="w-full p-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-teal-600"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <select
          className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
          value={communityId}
          onChange={e => setCommunityId(e.target.value)}
        >
          <option value="">Select community</option>
          {communities.map(c => (
            <option key={c.communityId} value={c.communityId}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="w-full p-3 rounded bg-neutral-800 text-white outline-none"
          value={postDate}
          onChange={e => setPostDate(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,video/*"
          className="w-full text-sm text-neutral-300"
          onChange={e => setMedia(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </div>
    </div>
  )
}