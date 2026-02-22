// import { NextResponse } from "next/server"
// import { createClient } from "@sanity/client"

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2024-01-01",
//   useCdn: false,
// })

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url)
//   const postId = searchParams.get("postId")

//   if (!postId) {
//     return NextResponse.json([], { status: 400 })
//   }

//   const comments = await client.fetch(
//     `
//     *[_type=="comment" && post._ref==$postId] | order(_createdAt asc) {
//       _id,
//       text,
//       _createdAt,
//       author->{
//         _id,
//         username
//       }
//     }
//     `,
//     { postId }
//   )

//   return NextResponse.json(comments)
// }
// import { NextResponse } from "next/server"
// import { client } from "@/lib/sanity"
// import { writeClient } from "@/lib/sanity.write"
// import { getAuth } from "@clerk/nextjs/server"

// /* ---------------- GET COMMENTS ---------------- */
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const postId = searchParams.get("postId");

//   if (!postId) {
//     return NextResponse.json({ comments: [] });
//   }

//   const comments = await client.fetch(
//   `*[_type=="comment" && post._ref==$postId]{
//     _id,
//     text,
//     "parent": parent._ref,
//     author->{
//       name
//     }
//   } | order(_createdAt asc)`,
//   { postId }
// );


//   return NextResponse.json({ comments });
// }

// /* ---------------- CREATE COMMENT ---------------- */
// export async function POST(req: Request) {
//   try {
//     // ✅ FIX: use getAuth(req)
//     const { userId } = getAuth(req)

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       )
//     }

//     const { postId, text, parentId } = await req.json()

//     if (!postId || !text) {
//       return NextResponse.json(
//         { error: "Missing fields" },
//         { status: 400 }
//       )
//     }

//     const doc = await writeClient.create({
//       _type: "comment",
//       text,
//       post: { _type: "reference", _ref: postId },

//       author: {
//         _type: "reference",
//         _ref: userId,
//       },

//       ...(parentId && {
//         parent: { _type: "reference", _ref: parentId },
//       }),
//     })

//     return NextResponse.json({ success: true, doc })
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json(
//       { error: "Failed to create comment" },
//       { status: 500 }
//     )
//   }
// }
import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"
import { writeClient } from "@/lib/sanity.write"
import { getAuth } from "@clerk/nextjs/server"

/* ---------------- GET COMMENTS ---------------- */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ comments: [] })
  }

  const comments = await client.fetch(
    `*[_type=="comment" && post._ref==$postId]{
      _id,
      text,
      parent->{ _id },
      author->{
        name
      }
    } | order(_createdAt asc)`,
    { postId }
  )

  return NextResponse.json({ comments })
}

/* ---------------- CREATE COMMENT ---------------- */
export async function POST(req: Request) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { postId, text, parentId } = await req.json()

  if (!postId || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const doc = await writeClient.create({
    _type: "comment",
    text,
    post: { _type: "reference", _ref: postId },
    author: { _type: "reference", _ref: userId },
    ...(parentId && {
      parent: { _type: "reference", _ref: parentId },
    }),
  })

  return NextResponse.json({ success: true, doc })
}
