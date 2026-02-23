


"use client"

import { useState } from "react"
import { ArrowBigUp, ArrowBigDown } from "lucide-react"

type Props = {
  postId: string
  score: number
  setScore: (value: number) => void
}

export default function LikeDislikeButtons({
  postId,
  score,
  setScore,
}: Props) {
  const [myVote, setMyVote] = useState<1 | -1 | null>(null)
  const [loading, setLoading] = useState(false)

  async function vote(value: 1 | -1) {
    if (loading) return
    setLoading(true)

    let newScore = score

    if (myVote === value) {
      // remove vote
      newScore = score - value
      setMyVote(null)
    } else {
      if (myVote !== null) {
        newScore = score - myVote
      }
      newScore += value
      setMyVote(value)
    }

    setScore(newScore)

    try {
      await fetch("/api/like", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    postId: postId,
    value: 1,   // 🔥 NUMBER, STRING NAHI
  }),
})

    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => vote(1)}
        disabled={loading}
        className={`${
          myVote === 1 ? "text-orange-500" : "text-neutral-400"
        } hover:text-orange-500`}
      >
        <ArrowBigUp size={22} />
      </button>

      <span className="text-sm font-semibold text-white min-w-[20px] text-center">
        {score}
      </span>

      <button
        onClick={() => vote(-1)}
        disabled={loading}
        className={`${
          myVote === -1 ? "text-blue-500" : "text-neutral-400"
        } hover:text-blue-500`}
      >
        <ArrowBigDown size={22} />
      </button>
    </div>
  )
}