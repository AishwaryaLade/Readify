// import { NextResponse } from "next/server"
// import client from "@/lib/sanity"

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const postId = searchParams.get("postId")

//     if (!postId) {
//       return NextResponse.json({ score: 0 })
//     }

//     const score = await client.fetch(
//       `
//       count(*[_type == "vote" && post._ref == $postId && value == 1])
//       `,
//       { postId }
//     )

//     return NextResponse.json({ score: score || 0 })
//   } catch (error) {
//     console.error("POST SCORE ERROR:", error)
//     return NextResponse.json({ score: 0 })
//   }
// }
import { NextResponse } from "next/server"
import client from "@/lib/sanity"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get("postId")
    const userId = searchParams.get("userId") // optional: current user to highlight button

    if (!postId) return NextResponse.json({ score: 0, userVote: 0 })

    const post = await client.fetch(
      `*[_type=="post" && _id==$postId][0]{
        score,
        "userVote": *[_type=="vote" && post._ref==$postId && user._ref==$userId][0].value
      }`,
      { postId, userId }
    )

    return NextResponse.json({
      score: post?.score ?? 0,
      userVote: post?.userVote ?? 0,
    })
  } catch (err) {
    console.error("POST SCORE ERROR:", err)
    return NextResponse.json({ score: 0, userVote: 0 })
  }
}
