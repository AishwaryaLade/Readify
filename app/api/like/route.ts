// // import { NextResponse } from "next/server"
// // import { getAuth } from "@clerk/nextjs/server"
// // import { writeClient } from "@/lib/sanity.write"

// // export async function POST(req: Request) {
// //   const { userId } = getAuth(req)
// //   if (!userId) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
// //   }

// //   const { postId, value } = await req.json()

// //   const existing = await writeClient.fetch(
// //     `*[_type=="like" && post._ref==$postId && userId==$userId][0]`,
// //     { postId, userId }
// //   )

// //   if (existing) {
// //     if (existing.value === value) {
// //       await writeClient.delete(existing._id)
// //       return NextResponse.json({ removed: true })
// //     } else {
// //       await writeClient.patch(existing._id).set({ value }).commit()
// //       return NextResponse.json({ updated: true })
// //     }
// //   }

// //   await writeClient.create({
// //     _type: "like",
// //     post: { _type: "reference", _ref: postId },
// //     userId,
// //     value,
// //   })

// //   return NextResponse.json({ created: true })
// // }

// // main  


// import { NextResponse } from "next/server"
// import { client } from "@/lib/sanity"
// import { getAuth } from "@clerk/nextjs/server"

// export async function POST(req: Request) {
//   try {
//     const { userId } = getAuth(req)
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { postId, value } = await req.json()

//     if (!postId) {
//       return NextResponse.json(
//         { error: "Post ID required" },
//         { status: 400 }
//       )
//     }

//     if (![1, -1].includes(value)) {
//       return NextResponse.json(
//         { error: "Invalid vote" },
//         { status: 400 }
//       )
//     }

//     // 🔍 find existing vote
//     const existingVote = await client.fetch(
//       `*[_type=="like" && post._ref==$postId && user._ref==$userId][0]`,
//       { postId, userId }
//     )

//     // 🆕 no previous vote
//     if (!existingVote) {
//       await client.create({
//         _type: "like",
//         post: { _type: "reference", _ref: postId },
//         user: { _type: "reference", _ref: userId },
//         value,
//       })
//     }
//     // 🔁 same vote again → do nothing
//     else if (existingVote.value === value) {
//       // intentionally empty
//     }
//     // 🔄 switch vote
//     else {
//       await client.patch(existingVote._id).set({ value }).commit()
//     }

//     // 📊 recalc counts
//     const result = await client.fetch(
//       `
//       {
//         "likes": count(*[_type=="like" && post._ref==$postId && value==1]),
//         "dislikes": count(*[_type=="like" && post._ref==$postId && value==-1])
//       }
//       `,
//       { postId }
//     )

//     return NextResponse.json({
//       likeCount: result.likes,
//       dislikeCount: result.dislikes,
//     })
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     )
//   }
// }
// // import { NextResponse } from "next/server"
// // import { currentUser } from "@clerk/nextjs/server"
// // import { writeClient } from "@/lib/sanity.write"

// // export async function POST(req: Request) {
// //   try {
// //     const clerkUser = await currentUser()
// //     if (!clerkUser) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
// //     }

// //     const { postId, value } = await req.json()

// //     if (!postId || value === undefined) {
// //       return NextResponse.json(
// //         { error: "Missing postId or value" },
// //         { status: 400 }
// //       )
// //     }

// //     // ✅ get sanity user
// //     const sanityUser = await writeClient.fetch(
// //       `*[_type=="user" && clerkId==$clerkId][0]`,
// //       { clerkId: clerkUser.id }
// //     )

// //     if (!sanityUser?._id) {
// //       return NextResponse.json(
// //         { error: "Sanity user not found" },
// //         { status: 404 }
// //       )
// //     }

// //     // ✅ DELETE existing vote (prevent multiple votes)
// //     await writeClient.delete({
// //       query: `*[_type=="vote" && post._ref==$postId && user._ref==$userId]`,
// //       params: {
// //         postId,
// //         userId: sanityUser._id,
// //       },
// //     })

// //     // ✅ If value = 0 → just remove vote (reset case)
// //     if (value === 0) {
// //       return NextResponse.json({ ok: true, message: "Vote removed" })
// //     }

// //     // ✅ Create new vote
// //     const vote = await writeClient.create({
// //       _type: "vote",
// //       post: {
// //         _type: "reference",
// //         _ref: postId,
// //       },
// //       user: {
// //         _type: "reference",
// //         _ref: sanityUser._id,
// //       },
// //       value, // 1 or -1
// //     })

// //     return NextResponse.json({ ok: true, vote })
// //   } catch (err) {
// //     console.error("VOTE ERROR:", err)
// //     return NextResponse.json({ error: "Vote failed" }, { status: 500 })
// //   }
// // }
// // import { NextResponse } from "next/server"
// // import { currentUser } from "@clerk/nextjs/server"
// // import { writeClient } from "@/lib/sanity.write"

// // export async function POST(req: Request) {
// //   try {
// //     const user = await currentUser()
// //     if (!user) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
// //     }

// //     const { postId, value } = await req.json()

// //     if (!postId || value === undefined) {
// //       return NextResponse.json({ error: "Invalid data" }, { status: 400 })
// //     }

// //     // 🔥 Find existing vote
// //     const existingVote = await writeClient.fetch(
// //       `*[_type=="vote" && post._ref==$postId && user._ref==$userId][0]`,
// //       {
// //         postId,
// //         userId: user.id,
// //       }
// //     )

// //     // ✅ If already voted same → remove (toggle)
// //     if (existingVote && existingVote.value === value) {
// //       await writeClient.delete(existingVote._id)
// //       return NextResponse.json({ ok: true })
// //     }

// //     // ✅ If voted opposite → update
// //     if (existingVote && existingVote.value !== value) {
// //       await writeClient.patch(existingVote._id)
// //         .set({ value })
// //         .commit()

// //       return NextResponse.json({ ok: true })
// //     }

// //     // ✅ If no vote → create new
// //     await writeClient.create({
// //       _type: "vote",
// //       post: {
// //         _type: "reference",
// //         _ref: postId,
// //       },
// //       user: {
// //         _type: "reference",
// //         _ref: user.id,
// //       },
// //       value,
// //     })

// //     return NextResponse.json({ ok: true })
// //   } catch (err) {
// //     console.error("VOTE ERROR:", err)
// //     return NextResponse.json({ error: "Vote failed" }, { status: 500 })
// //   }
// // }
// // like/route.ts
// // import { NextResponse } from "next/server"
// // import { currentUser } from "@clerk/nextjs/server"
// // import { writeClient } from "@/lib/sanity.write"

// // export async function POST(req: Request) {
// //   try {
// //     const user = await currentUser()
// //     if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

// //     const { postId, value } = await req.json() // value = 1 for upvote, -1 for downvote
// //     if (!postId || value === undefined)
// //       return NextResponse.json({ error: "Invalid data" }, { status: 400 })

// //     // find existing vote by this user
// //     const existingVote = await writeClient.fetch(
// //       `*[_type=="vote" && post._ref==$postId && user._ref==$userId][0]`,
// //       { postId, userId: user.id }
// //     )

// //     let scoreChange = 0

// //     if (existingVote) {
// //       if (existingVote.value === value) {
// //         // Same vote → remove vote
// //         await writeClient.delete(existingVote._id)
// //         scoreChange = -value
// //       } else {
// //         // Opposite vote → switch vote
// //         await writeClient.patch(existingVote._id).set({ value }).commit()
// //         scoreChange = value * 2 // remove old + add new
// //       }
// //     } else {
// //       // no existing vote → create
// //       await writeClient.create({
// //         _type: "vote",
// //         post: { _type: "reference", _ref: postId },
// //         user: { _type: "reference", _ref: user.id },
// //         value,
// //       })
// //       scoreChange = value
// //     }

// //     // Update post document score field
// //     await writeClient
// //       .patch(postId)
// //       .setIfMissing({ score: 0 }) // important
// //       .inc({ score: scoreChange })
// //       .commit()

// //     return NextResponse.json({ ok: true, scoreChange })
// //   } catch (err) {
// //     console.error(err)
// //     return NextResponse.json({ error: "Vote failed" }, { status: 500 })
// //   }
// // }



import { NextResponse } from "next/server"
import { writeClient } from "@/lib/sanity.write"

export async function POST(req: Request) {
  try {
    const { postId, value } = await req.json()

    if (!postId || typeof value !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    await writeClient
      .patch(postId)
      .setIfMissing({ score: 0 })
      .inc({ score: value })  // 🔥 ALWAYS increment
      .commit()

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}