// // "use client"

// // export default function ({ comments = [] }: { comments: any[] }) {
// //   if (!Array.isArray(comments) || comments.length === 0) {
// //     return (
// //       <p className="text-sm text-neutral-500 mt-2">
// //         No comments yet
// //       </p>
// //     )
// //   }

// //   return (
// //     <div className="space-y-3">
// //       {comments.map((comment) => (
// //         <div
// //           key={comment._CommentTreeid}
// //           className="border-l border-neutral-700 pl-3"
// //         >
// //           <p className="text-sm text-neutral-300">
// //             {comment.author?.username ?? "anonymous"}
// //           </p>
// //           <p className="text-neutral-200">{comment.text}</p>

// //           {comment.replies && comment.replies.length > 0 && (
// //             <CommentTree comments={comment.replies} />
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }


// "use client"

// import LikeDislikeButtons from "../LikeDislikeButtons"

// type Comment = {
//   _id: string
//   content: string
//   author?: {
//     username?: string
//   }
//   likeCount?: number
//   dislikeCount?: number
// }

// export default function CommentTree({
//   comments,
// }: {
//   comments: Comment[]
// }) {
//   if (!comments || comments.length === 0) {
//     return <p className="text-sm text-neutral-500 mt-2">No comments yet</p>
//   }

//   return (
//     <div className="space-y-4">
//       {comments.map((comment) => (
//         <div
//           key={comment._id}
//           className="grid grid-cols-[auto_1fr] gap-3"
//         >
//           {/* LEFT: VOTES */}
//           <LikeDislikeButtons
//             postId={comment._id}
//             likeCount={comment.likeCount ?? 0}
//             dislikeCount={comment.dislikeCount ?? 0}
//           />

//           {/* RIGHT: COMMENT */}
//           <div>
//             <p className="text-xs text-neutral-400">
//               {comment.author?.username ?? "anonymous"}
//             </p>
//             <p className="text-sm text-neutral-200">
//               {comment.content}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
// "use client"

// import { useState } from "react"
// import CommentInput from "./CommentInput"

// type Comment = {
//   _id: string
//   text: string
//   parent?: { _id: string }
//   author?: { name?: string }
// }

// export default function CommentTree({
//   comments,
//   postId,
//   reload,
// }: {
//   comments: Comment[]
//   postId: string
//   reload: () => void
// }) {
//   const [replyTo, setReplyTo] = useState<string | null>(null)

//   const roots = comments.filter(c => !c.parent)
//   const replies = (id: string) =>
//     comments.filter(c => c.parent?._id === id)

//   function render(list: Comment[], level = 0) {
//     return list.map(c => (
//       <div key={c._id} style={{ marginLeft: level * 20 }}>
//         <p className="text-xs text-neutral-400">
//           {c.author?.name || "Anonymous"}
//         </p>

//         <p className="text-sm text-white">{c.text}</p>

//         <button
//           onClick={() => setReplyTo(replyTo === c._id ? null : c._id)}
//           className="text-xs text-teal-400"
//         >
//           Reply
//         </button>

//         {replyTo === c._id && (
//           <CommentInput
//             postId={postId}
//             parentId={c._id}
//             onSuccess={() => {
//               setReplyTo(null)
//               reload()
//             }}
//           />
//         )}

//         {render(replies(c._id), level + 1)}
//       </div>
//     ))
//   }

//   return <div className="space-y-4">{render(roots)}</div>
// }
// "use client"

// import { useState } from "react"
// import CommentInput from "./CommentInput"

// type Comment = {
//   _id: string
//   text: string
//   parent?: {
//     _id: string
//   }
//   author?: {
//     name?: string
//   }
// }

// export default function CommentTree({
//   comments,
//   postId,
//   reload,
// }: {
//   comments: Comment[]
//   postId: string
//   reload: () => void
// }) {
//   const [replyTo, setReplyTo] = useState<string | null>(null)

//   // root comments
//   const rootComments = comments.filter((c) => !c.parent)

//   // get replies of comment
//   const getReplies = (id: string) =>
//     comments.filter((c) => c.parent?._id === id)

//   const renderComments = (list: Comment[], level = 0) => {
//     return list.map((comment) => (
//       <div
//         key={comment._id}
//         style={{ marginLeft: level * 20 }}
//         className="space-y-2"
//       >
//         <div className="bg-neutral-800 p-3 rounded">
//           <p className="text-xs text-neutral-400">
//             {comment.author?.name || "Anonymous"}
//           </p>

//           <p className="text-sm text-white">{comment.text}</p>

//           <button
//             onClick={() =>
//               setReplyTo(replyTo === comment._id ? null : comment._id)
//             }
//             className="text-xs text-teal-400 mt-1"
//           >
//             Reply
//           </button>

//           {replyTo === comment._id && (
//             <CommentInput
//               postId={postId}
//               parentId={comment._id}
//               onSuccess={() => {
//                 setReplyTo(null)
//                 reload()
//               }}
//             />
//           )}
//         </div>

//         {/* Nested replies */}
//         {getReplies(comment._id).length > 0 && (
//           <div>{renderComments(getReplies(comment._id), level + 1)}</div>
//         )}
//       </div>
//     ))
//   }

//   return <div className="space-y-4">{renderComments(rootComments)}</div>
// }
"use client"

import { useState } from "react"
import CommentInput from "./CommentInput"

type Comment = {
  _id: string
  text: string
  parent?: {
    _id: string
  }
  author?: {
    name?: string
  }
}

export default function CommentTree({
  comments,
  postId,
  setComments,
}: {
  comments: Comment[]
  postId: string
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}) {
  const [replyTo, setReplyTo] = useState<string | null>(null)

  const rootComments = comments.filter((c) => !c.parent)

  const getReplies = (id: string) =>
    comments.filter((c) => c.parent?._id === id)

  const handleNewComment = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment])
  }

  const renderComments = (list: Comment[], level = 0) => {
    return list.map((comment) => (
      <div
        key={comment._id}
        style={{ marginLeft: level * 20 }}
        className="space-y-2"
      >
        <div className="bg-neutral-800 p-3 rounded">
          <p className="text-xs text-neutral-400">
            {comment.author?.name || "Anonymous"}
          </p>

          <p className="text-sm text-white">{comment.text}</p>

          <button
            onClick={() =>
              setReplyTo(replyTo === comment._id ? null : comment._id)
            }
            className="text-xs text-teal-400 mt-1"
          >
            Reply
          </button>

          {replyTo === comment._id && (
            <CommentInput
              postId={postId}
              parentId={comment._id}
              onSuccess={(newComment) => {
                handleNewComment(newComment)
                setReplyTo(null)
              }}
            />
          )}
        </div>

        {getReplies(comment._id).length > 0 && (
          <div>{renderComments(getReplies(comment._id), level + 1)}</div>
        )}
      </div>
    ))
  }

  return <div className="space-y-4">{renderComments(rootComments)}</div>
}
