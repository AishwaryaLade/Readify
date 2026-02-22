// type Comment = {
//   _id: string
//   text: string
//   author: {
//     _id: string
//     username: string
//   }
// }

// export default function CommentList({ comments }: { comments: Comment[] }) {
//   return (
//     <div className="mt-4 space-y-3">
//       {comments.map((c) => (
//         <div
//           key={c._id}
//           className="rounded-md bg-zinc-900 p-3"
//         >
//           <p className="text-sm text-gray-400">
//             {c.author?.username ?? "anonymous"}
//           </p>
//           <p className="text-white">{c.text}</p>
//         </div>
//       ))}
//     </div>
//   )
// }
type Comment = {
  _id: string
  text: string
  parent?: { _ref: string }
  author?: {
    name?: string
  }
}

export default function CommentList({
  comments,
}: {
  comments: Comment[]
}) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        No comments yet
      </p>
    )
  }

  // only show root comments
  const rootComments = comments.filter(c => !c.parent)

  return (
    <div className="mt-4 space-y-3">
      {rootComments.map((c) => (
        <div
          key={c._id}
          className="rounded-md bg-neutral-800 p-3"
        >
          <p className="text-xs text-neutral-400">
            {c.author?.name ?? "anonymous"}
          </p>

          <p className="text-sm text-white">
            {c.text}
          </p>
        </div>
      ))}
    </div>
  )
}
