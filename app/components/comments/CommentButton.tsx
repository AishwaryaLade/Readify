"use client"

import { useState } from "react"

export default function CommentButton({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  async function submit() {
    await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, text }),
    })
    setText("")
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="hover:text-white">
        💬 Comment
      </button>

      {open && (
        <div className="mt-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-neutral-800 p-2 rounded"
          />
          <button
            onClick={submit}
            className="mt-2 px-3 py-1 bg-blue-600 rounded"
          >
            Post
          </button>
        </div>
      )}
    </>
  )
}
