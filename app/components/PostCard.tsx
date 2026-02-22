
// "use client"

// import { useState } from "react"
// import LikeDislikeButtons from "./LikeDislikeButtons"
// import CommentTree from "./comments/CommentTree"
// import CommentInput from "./comments/CommentInput"
// import { Main } from "next/document"

// export default function PostCard({ post }: { post: any }) {
//   const [showComments, setShowComments] = useState(false)

//   if (!post) return null

//   return (
//     <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
//       {/* HEADER */}
//       <div className="text-sm text-neutral-400">
//         r/{post.community?.name ?? "unknown"} • Posted by{" "}
//         {post.author?.username ?? "anonymous"}
//       </div>

//       {/* CONTENT */}
//       <h2 className="text-lg font-semibold mt-2">{post.title}</h2>

//       {post.content && (
//         <p className="text-neutral-300 mt-1">{post.content}</p>
//       )}

//       {/* MEDIA */}
//       {Array.isArray(post.media) &&
//         post.media.map((m: any, i: number) => {
//           if (m._type === "image" && m.asset?.url) {
//             return (
//               <img
//                 key={i}
//                 src={m.asset.url}
//                 className="mt-3 rounded max-h-[500px]"
//               />
//             )
//           }

//           if (m._type === "video" && m.asset?.url) {
//             return (
//               <video key={i} controls className="mt-3 rounded max-h-[500px]">
//                 <source src={m.asset.url} />
//               </video>
//             )
//           }

//           return null
//         })}

//       {/* ACTIONS */}
//       <div className="flex gap-6 mt-4 text-sm text-neutral-400">
//         <LikeDislikeButtons
//            postId={post._id}
//             score={post.score}
//             myVote={post.myVote ?? null}
//         />

//         <button
//           onClick={() => setShowComments((v) => !v)}
//           className="hover:text-white"
//         >
//           💬 Comments
//         </button>
//       </div>

//       {/* COMMENTS */}
//       {showComments && (
//         <div className="mt-4">
//           <CommentInput postId={post._id} />

//           <CommentTree comments={post.comments ?? []} />
//         </div>
//       )}
//     </div>
//   )
// }
// "use client"

// import { useState } from "react"
// import LikeDislikeButtons from "./LikeDislikeButtons"
// import CommentTree from "./comments/CommentTree"
// import CommentInput from "./comments/CommentInput"

// export default function PostCard({ post }: { post: any }) {
//   const [showComments, setShowComments] = useState(false)

//   if (!post) return null

//   return (
//     <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
//       {/* HEADER */}
//       <div className="text-sm text-neutral-400">
//         r/{post.community?.name ?? "unknown"} • Posted by{" "}
//         {post.author?.name ?? "anonymous"}
//       </div>

//       {/* TITLE */}
//       <h2 className="text-lg font-semibold mt-2">{post.title}</h2>

//       {/* CONTENT */}
//       {post.content && (
//         <p className="text-neutral-300 mt-1 whitespace-pre-line">
//           {post.content}
//         </p>
//       )}

//       {/* 🔥 MEDIA (IMAGE FIX) */}
//       {post.mediaUrl && (
//         <img
//           src={post.mediaUrl}
//           alt="post media"
//           className="mt-3 rounded max-h-[500px] w-full object-contain"
//         />
//       )}

//       {/* ACTIONS */}
//       <div className="flex gap-6 mt-4 text-sm text-neutral-400">
//         <LikeDislikeButtons
//           postId={post._id}
//           score={post.score ?? 0}
//           myVote={post.myVote ?? null}
//         />

//         <button
//           onClick={() => setShowComments((v) => !v)}
//           className="hover:text-white"
//         >
//           💬 Comments
//         </button>
//       </div>

//       {/* COMMENTS */}
//       {showComments && (
//         <div className="mt-4">
//           <CommentInput postId={post._id} />
//           <CommentTree comments={post.comments ?? []} />
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import LikeDislikeButtons from "./LikeDislikeButtons"
import CommentInput from "./comments/CommentInput"
import CommentTree from "./comments/CommentTree"

export default function PostCard({ post }: { post: any }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // ✅ NEW: Like state
  const [score, setScore] = useState<number | null>(null)

  async function loadComments() {
    setLoading(true)
    const res = await fetch(`/api/comment?postId=${post._id}`)
    const data = await res.json()
    setComments(data.comments || [])
    setLoading(false)
  }

  // ✅ NEW: Fetch latest like score
  async function loadScore() {
    const res = await fetch(`/api/post-score?postId=${post._id}`)
    const data = await res.json()
    setScore(data.score)
  }

  useEffect(() => {
    loadComments()
    loadScore()   // ✅ load likes on mount
  }, [])

  function toggleComments() {
    setShowComments((v) => !v)
  }

  return (
    <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
      <div className="text-sm text-neutral-400">
        r/{post.community?.name ?? "unknown"} • Posted by{" "}
        {post.author?.name ?? "anonymous"}
      </div>

      <h2 className="text-lg font-semibold mt-2">{post.title}</h2>

      {post.content && (
        <p className="text-neutral-300 mt-1">{post.content}</p>
      )}

      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="post media"
          className="mt-3 rounded-lg max-h-[450px] w-full object-contain bg-black"
        />
      )}

      <div className="flex gap-6 mt-4 text-sm text-neutral-400">
        {/* Like Button */}
<LikeDislikeButtons
  postId={post._id}
  score={score ?? 0}
  setScore={setScore}
/>


        <button onClick={toggleComments} className="hover:text-white">
          💬 Comments ({loading ? "..." : comments.length})
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <CommentInput postId={post._id} />

          {loading ? (
            <p className="text-sm text-neutral-500 mt-2">Loading...</p>
          ) : (
            <CommentTree
              comments={comments}
              postId={post._id}
              reload={loadComments}
            />
          )}
        </div>
      )}
    </div>
  )
}
