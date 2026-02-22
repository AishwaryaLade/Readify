// "use client"

// import { useState } from "react"

// export default function CommentInput({ postId }: { postId: string }) {
//   const [text, setText] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function submit() {
//     if (!text.trim()) return
//     setLoading(true)

//     await fetch("/api/comment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ postId, text }),
//     })

//     setText("")
//     setLoading(false)
//   }

//   return (
//     <div className="mt-3">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Add a comment..."
//         className="w-full bg-neutral-800 p-2 rounded text-sm"
//       />
//       <button
//         onClick={submit}
//         disabled={loading}
//         className="mt-2 text-sm bg-blue-600 px-3 py-1 rounded"
//       >
//         Comment
//       </button>
//     </div>
//   )
// }
// "use client"

// import { useState } from "react"

// export default function CommentInput({
//   postId,
//   parentId,
//   onSuccess,
// }: {
//   postId: string
//   parentId?: string
//   onSuccess: () => void
// }) {
//   const [text, setText] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function submit() {
//     if (!text.trim()) return

//     setLoading(true)

//     const res = await fetch("/api/comment", {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ postId, text, parentId }),
//     })

//     setLoading(false)

//     if (!res.ok) {
//       alert("Comment failed")
//       return
//     }

//     setText("")
//     onSuccess()
//   }

//   return (
//     <div className="mt-2">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 bg-neutral-800 rounded text-sm"
//         placeholder="Write a reply..."
//       />
//       <button
//         onClick={submit}
//         className="mt-1 text-xs bg-teal-600 px-3 py-1 rounded"
//       >
//         {loading ? "Posting..." : "Post"}
//       </button>
//     </div>
//   )
// }
// "use client"

// import { useState } from "react"

// export default function CommentInput({
//   postId,
//   parentId,
//   onSuccess,
// }: {
//   postId: string
//   parentId?: string
//   onSuccess: () => void
// }) {
//   const [text, setText] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function submit() {
//     if (!text.trim()) return

//     setLoading(true)

//     console.log("Submitting comment:", {
//       postId,
//       text,
//       parentId,
//     })

//     const res = await fetch("/api/comment", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         postId,
//         text,
//         parentId: parentId || null, // IMPORTANT
//       }),
//     })

//     setLoading(false)

//     if (!res.ok) {
//       alert("Comment failed")
//       return
//     }

//     setText("")
//     onSuccess()
//   }

//   return (
//     <div className="mt-2 space-y-2">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write a reply..."
//         className="w-full p-2 bg-neutral-800 rounded text-sm"
//       />

//       <button
//         onClick={submit}
//         className="text-xs bg-teal-600 px-3 py-1 rounded"
//       >
//         {loading ? "Posting..." : "Post"}
//       </button>
//     </div>
//   )
// }
"use client"

import { useState } from "react"

export default function CommentInput({
  postId,
  parentId,
  onSuccess,
}: {
  postId: string
  parentId?: string
  onSuccess: (newComment: any) => void   // ✅ CHANGE 1 (receive new comment)
}) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!text.trim()) return

    setLoading(true)

    const res = await fetch("/api/comment", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        text,
        parentId: parentId || null,
      }),
    })

    const data = await res.json()   // ✅ CHANGE 2 (get response data)

    setLoading(false)

    if (!res.ok) {
      alert("Comment failed")
      return
    }

    setText("")

    // ✅ Pass newly created comment back
    onSuccess(data.comment)
  }

  return (
    <div className="mt-2 space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        className="w-full p-2 bg-neutral-800 rounded text-sm"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="text-xs bg-teal-600 px-3 py-1 rounded"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  )
}
