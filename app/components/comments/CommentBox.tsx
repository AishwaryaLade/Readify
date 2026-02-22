// "use client"

// import { useState } from "react"

// export default function CommentBox({
//   postId,
//   parentId,
//   onDone,
// }: {
//   postId: string
//   parentId?: string
//   onDone?: () => void
// }) {
//   const [text, setText] = useState("")

//   async function submit() {
//     if (!text.trim()) return

//     await fetch("/api/comment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ postId, text, parentId }),
//     })

//     setText("")
//     onDone?.()
//   }

//   return (
//     <div className="mt-2">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded"
//         placeholder="Add a comment"
//       />
//       <button
//         onClick={submit}
//         className="mt-2 text-sm text-blue-400"
//       >
//         Comment
//       </button>
//     </div>
//   )
// }
"use client";
import { useEffect, useState } from "react";
import CommentTree from "./CommentTree";
import CommentInput from "./CommentInput";

export default function CommentBox({ postId }) {
  const [comments, setComments] = useState([]);

  async function loadComments() {
    const res = await fetch(`/api/comment/list?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div>
      <CommentInput postId={postId} onSuccess={loadComments} />
      <CommentTree comments={comments} onReply={loadComments} />
    </div>
  );
}
