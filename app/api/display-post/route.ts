// import { NextResponse } from "next/server"
// import { createClient } from "@sanity/client"

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2024-01-01",
//   token: process.env.SANITY_API_TOKEN,
//   useCdn: false,
// })

// export async function GET() {
//   try {
//     const posts = await client.fetch(`
//       *[_type == "post"] | order(_createdAt desc) {
//         _id,
//         title,
//         content,

//         author->{
//           _id,
//           username
//         },

//         community->{
//           _id,
//           name
//         },

//         media[]{
//           _type,
//           asset->{
//             url
//           }
//         },

//         // 👍 likes
//         "likeCount": count(*[
//           _type=="reaction" &&
//           post._ref == ^._id &&
//           value == 1
//         ]),

//         // 👎 dislikes
//         "dislikeCount": count(*[
//           _type=="reaction" &&
//           post._ref == ^._id &&
//           value == -1
//         ]),

//         // 🧮 Reddit-style score
//         "score":
//           count(*[_type=="reaction" && post._ref==^._id && value==1]) -
//           count(*[_type=="reaction" && post._ref==^._id && value==-1])
//       }

//       "comments": *[
//     _type == "comment" &&
//     post._ref == ^._id
//   ] | order(_createdAt asc){
//     _id,
//     content,
//     _createdAt,
//     author->{
//       username
//     }
//   }
//     `)

//     return NextResponse.json(posts)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     )
//   }
// }

// main
// import { NextResponse } from "next/server"
// import { createClient } from "@sanity/client"

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2024-01-01",
//   token: process.env.SANITY_API_TOKEN,
//   useCdn: false,
// })

// export async function GET() {
//   try {
//     const posts = await client.fetch(`
//   *[_type == "post"] | order(_createdAt desc) {
//     _id,
//     title,
//     content,

//     author->{
//       _id,
//       username
//     },

//     community->{
//       _id,
//       name
//     },

//     media[]{
//       _type,
//       asset->{
//         url
//       }
//     },

//     // 👍 likes
//     "likeCount": count(*[
//       _type == "reaction" &&
//       post._ref == ^._id &&
//       value == 1
//     ]),

//     // 👎 dislikes
//     "dislikeCount": count(*[
//       _type == "reaction" &&
//       post._ref == ^._id &&
//       value == -1
//     ]),

//     // 🧮 score
//     "score":
//       count(*[_type=="reaction" && post._ref==^._id && value==1]) -
//       count(*[_type=="reaction" && post._ref==^._id && value==-1]),

//     // 💬 COMMENTS (THIS WAS MISSING)
//     "comments": *[
//       _type == "comment" &&
//       post._ref == ^._id
//     ] | order(_createdAt asc) {
//       _id,
//       content,
//       _createdAt,
//       author->{
//         username
//       }
//     }
//   }
// `)

//     return NextResponse.json(posts)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     )
//   }
// }


// import { NextResponse } from "next/server"
// import { client } from "@/lib/sanity"

// export async function GET() {
//   try {
//     const posts = await client.fetch(`
//       *[_type == "post"] | order(_createdAt desc) {
//         _id,
//         title,
//         content,
//         _createdAt,

//         "community": community->{
//           _id,
//           name,
//           slug
//         },

//         "author": author->{
//           _id,
//           username,
//           image
//         },

//         media[]{
//           _type,
//           asset->{
//             _id,
//             url
//           }
//         },

//         "likes": count(*[
//           _type == "like" &&
//           post._ref == ^._id &&
//           value == 1
//         ]),

//         "dislikes": count(*[
//           _type == "like" &&
//           post._ref == ^._id &&
//           value == -1
//         ])
//       }
//     `)

//     return NextResponse.json(posts)
//   } catch (error) {
//     console.error("DISPLAY POST ERROR:", error)
//     return new NextResponse("Failed to load posts", { status: 500 })
//   }
// }
// import { NextResponse } from "next/server"
// import { client } from "@/lib/sanity"
// import imageUrlBuilder from "@sanity/image-url"

// const builder = imageUrlBuilder(client)
// const urlFor = (src: any) => builder.image(src).url()

// export async function GET() {
//   const posts = await client.fetch(`
//     *[_type=="post"] | order(_createdAt desc){
//       _id,
//       title,
//       content,
//       author->{name},
//       community->{name},

//       // 👇 pick new media first, else old image
//       "image": coalesce(media, image)
//     }
//   `)

//   const withImages = posts.map((post: any) => ({
//     ...post,
//     mediaUrl: post.image ? urlFor(post.image) : null,
//   }))

//   return NextResponse.json(withImages)
// }

import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)

// Safe urlFor that only calls builder.image() if _ref is valid
const urlFor = (src: any) => {
  if (!src || !src._type || !src.asset?._ref) return null
  // Only use if it's a proper image reference
  if (src._type === "image" && src.asset._ref.startsWith("image-")) {
    return builder.image(src).url()
  }
  return null
}

export async function GET() {
  try {
    const posts = await client.fetch(`
      *[_type=="post"] | order(_createdAt desc){
        _id,
        title,
        content,
        author->{name},
        community->{name},
        // pick new media first, else old image
        "imageField": coalesce(media, image)
      }
    `)

    const withImages = posts.map((post: any) => ({
      ...post,
      mediaUrl: urlFor(post.imageField), // safely get URL
    }))

    return NextResponse.json(withImages)
  } catch (err) {
    console.error("DISPLAY POST ERROR:", err)
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 })
  }
}