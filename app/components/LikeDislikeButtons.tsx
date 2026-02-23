// // "use client"

// // import { useState, useEffect } from "react"
// // import { ArrowBigUp, ArrowBigDown } from "lucide-react"

// // type Props = {
// //   postId: string
// //   likeCount: number
// //   dislikeCount: number
// // }

// // export default function LikeDislikeButtons({
// //   postId,
// //   likeCount,
// //   dislikeCount,
// // }: Props) {
// //   const [likes, setLikes] = useState<number>(likeCount ?? 0)
// //   const [dislikes, setDislikes] = useState<number>(dislikeCount ?? 0)
// //   const [myVote, setMyVote] = useState<1 | -1 | null>(null)
// //   const [loading, setLoading] = useState(false)

// //   useEffect(() => {
// //     setLikes(likeCount ?? 0)
// //     setDislikes(dislikeCount ?? 0)
// //   }, [likeCount, dislikeCount])

// //   const score = likes - dislikes

// //   async function vote(value: 1 | -1) {
// //     if (loading) return
// //     setLoading(true)

// //     // optimistic UI
// //     if (myVote === value) {
// //       value === 1
// //         ? setLikes((l) => l - 1)
// //         : setDislikes((d) => d - 1)
// //       setMyVote(null)
// //     } else {
// //       if (myVote === 1) setLikes((l) => l - 1)
// //       if (myVote === -1) setDislikes((d) => d - 1)

// //       value === 1
// //         ? setLikes((l) => l + 1)
// //         : setDislikes((d) => d + 1)

// //       setMyVote(value)
// //     }

// //     try {
// //       await fetch("/api/like", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ postId, value }),
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="flex items-center">
// //       <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1b] hover:bg-[#272729] transition">
        
// //         {/* Upvote */}
// //         <button
// //           onClick={() => vote(1)}
// //           disabled={loading}
// //           className={`${
// //             myVote === 1 ? "text-orange-500" : "text-neutral-400"
// //           } hover:text-orange-500`}
// //         >
// //           <ArrowBigUp size={20} />
// //         </button>

// //         {/* Score */}
// //         <span className="min-w-[24px] text-center text-sm font-semibold text-neutral-200">
// //           {score}
// //         </span>

// //         {/* Downvote */}
// //         <button
// //           onClick={() => vote(-1)}
// //           disabled={loading}
// //           className={`${
// //             myVote === -1 ? "text-blue-500" : "text-neutral-400"
// //           } hover:text-blue-500`}
// //         >
// //           <ArrowBigDown size={20} />
// //         </button>

// //       </div>
// //     </div>
// //   )
// // }
// //main
// "use client"

// import { useState, useEffect } from "react"
// import { ArrowBigUp, ArrowBigDown } from "lucide-react"

// type Props = {
//   postId: string
//   likeCount: number
//   dislikeCount: number
// }

// export default function LikeDislikeButtons({
//   postId,
//   likeCount,
//   dislikeCount,
// }: Props) {
//   const [likes, setLikes] = useState<number>(likeCount ?? 0)
//   const [dislikes, setDislikes] = useState<number>(dislikeCount ?? 0)
//   const [myVote, setMyVote] = useState<1 | -1 | null>(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setLikes(likeCount ?? 0)
//     setDislikes(dislikeCount ?? 0)
//   }, [likeCount, dislikeCount])

//   const score = likes - dislikes

//   async function vote(value: 1 | -1) {
//     if (loading) return
//     setLoading(true)

//     // optimistic UI
//     if (myVote === value) {
//       value === 1
//         ? setLikes((l) => l - 1)
//         : setDislikes((d) => d - 1)
//       setMyVote(null)
//     } else {
//       if (myVote === 1) setLikes((l) => l - 1)
//       if (myVote === -1) setDislikes((d) => d - 1)

//       value === 1
//         ? setLikes((l) => l + 1)
//         : setDislikes((d) => d + 1)

//       setMyVote(value)
//     }

//     try {
//       await fetch("/api/like", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, value }),
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     // 🔥 FORCE HORIZONTAL
//     <div className="flex flex-row items-center">
//       <div className="flex flex-row items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1b] hover:bg-[#272729] transition">
        
//         {/* Upvote */}
//         <button
//           onClick={() => vote(1)}
//           disabled={loading}
//           className={`flex items-center ${
//             myVote === 1 ? "text-orange-500" : "text-neutral-400"
//           } hover:text-orange-500`}
//         >
//           <ArrowBigUp size={20} />
//         </button>

//         {/* Score */}
//         <span className="min-w-[24px] text-center text-sm font-semibold text-neutral-200">
//           {score}
//         </span>

//         {/* Downvote */}
//         <button
//           onClick={() => vote(-1)}
//           disabled={loading}
//           className={`flex items-center ${
//             myVote === -1 ? "text-blue-500" : "text-neutral-400"
//           } hover:text-blue-500`}
//         >
//           <ArrowBigDown size={20} />
//         </button>

//       </div>
//     </div>
//   )
// }
// // "use client"

// // import { useState } from "react"
// // import { ArrowBigUp, ArrowBigDown } from "lucide-react"
// // import { useUser } from "@clerk/nextjs"

// // type Props = {
// //   postId: string
// //   likeCount: number
// //   dislikeCount: number
// // }

// // export default function LikeDislikeButtons({
// //   postId,
// //   likeCount,
// //   dislikeCount,
// // }: Props) {
// //   const { user } = useUser()

// //   const [likes, setLikes] = useState(likeCount ?? 0)
// //   const [dislikes, setDislikes] = useState(dislikeCount ?? 0)
// //   const [loading, setLoading] = useState(false)

// //   async function vote(value: 1 | -1) {
// //     if (!user || loading) return
// //     setLoading(true)

// //     // optimistic UI
// //     value === 1
// //       ? setLikes((l) => l + 1)
// //       : setDislikes((d) => d + 1)

// //     try {
// //       await fetch("/api/like", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           postId,
// //           value,
// //           clerkId: user.id, // 🔥 THIS WAS MISSING
// //         }),
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="flex items-center gap-2">
// //       <button onClick={() => vote(1)} disabled={loading}>
// //         <ArrowBigUp />
// //       </button>

// //       <span>{likes - dislikes}</span>

// //       <button onClick={() => vote(-1)} disabled={loading}>
// //         <ArrowBigDown />
// //       </button>
// //     </div>
// //   )
// // }
// // "use client"

// // import { useState, useEffect } from "react"
// // import { ArrowBigUp, ArrowBigDown } from "lucide-react"
// // import { useUser } from "@clerk/nextjs"

// // type Props = {
// //   postId: string
// // }

// // export default function LikeDislikeButtons({ postId }: Props) {
// //   const { user } = useUser()
// //   const [score, setScore] = useState<number | null>(null)
// //   const [loading, setLoading] = useState(false)

// //   async function fetchScore() {
// //     const res = await fetch(`/api/post-score?postId=${postId}`)
// //     const data = await res.json()
// //     setScore(data.score ?? 0)
// //   }

// //   useEffect(() => {
// //     fetchScore()
// //   }, [postId])

// //   async function vote(value: 1 | -1) {
// //     if (!user || loading) return
// //     setLoading(true)

// //     await fetch("/api/like", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ postId, value }),
// //     })

// //     await fetchScore()
// //     setLoading(false)
// //   }

// //   return (
// //     <div className="flex items-center gap-2">
// //       <button
// //         onClick={() => vote(1)}
// //         disabled={loading}
// //         className="hover:text-green-500"
// //       >
// //         <ArrowBigUp />
// //       </button>

// //       <span>{score ?? "..."}</span>

// //       <button
// //         onClick={() => vote(-1)}
// //         disabled={loading}
// //         className="hover:text-red-500"
// //       >
// //         <ArrowBigDown />
// //       </button>
// //     </div>
// //   )
// // }
// // "use client"
// // import { useState, useEffect } from "react"
// // import { ArrowBigUp, ArrowBigDown } from "lucide-react"
// // import { useUser } from "@clerk/nextjs"

// // type Props = { postId: string }

// // export default function LikeDislikeButtons({ postId }: Props) {
// //   const { user, isLoaded } = useUser()
// //   const [score, setScore] = useState<number>(0)
// //   const [userVote, setUserVote] = useState<1 | -1 | 0>(0)
// //   const [loading, setLoading] = useState(false)

// //   async function fetchScore() {
// //     if (!isLoaded || !user) return
// //     const res = await fetch(`/api/post-score?postId=${postId}&userId=${user.id}`)
// //     const data = await res.json()
// //     setScore(data.score ?? 0)
// //     setUserVote(data.userVote ?? 0)
// //   }

// //   useEffect(() => { fetchScore() }, [postId, isLoaded, user?.id])

// //   async function vote(value: 1 | -1) {
// //     if (!isLoaded || !user || loading) return
// //     setLoading(true)

// //     let change = 0
// //     let newVote: 1 | -1 | 0 = userVote

// //     if (userVote === value) {
// //       // same vote → remove
// //       change = -value
// //       newVote = 0
// //     } else if (userVote === -value) {
// //       // opposite vote → switch
// //       change = value * 2
// //       newVote = value
// //     } else {
// //       // new vote
// //       change = value
// //       newVote = value
// //     }

// //     // Optimistic UI
// //     setScore(prev => prev + change)
// //     setUserVote(newVote)

// //     try {
// //       await fetch("/api/like", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ postId, value }),
// //       })
// //     } catch (err) {
// //       console.error(err)
// //       // rollback if error
// //       setScore(prev => prev - change)
// //       setUserVote(userVote)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="flex items-center gap-2">
// //       <button
// //         onClick={() => vote(1)}
// //         disabled={!isLoaded || loading}
// //         className={`hover:text-green-500 ${userVote===1?"text-green-600":""}`}
// //       >
// //         <ArrowBigUp />
// //       </button>

// //       <span>{score}</span>

// //       <button
// //         onClick={() => vote(-1)}
// //         disabled={!isLoaded || loading}
// //         className={`hover:text-red-500 ${userVote===-1?"text-red-600":""}`}
// //       >
// //         <ArrowBigDown />
// //       </button>
// //     </div>
// //   )
// // }


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