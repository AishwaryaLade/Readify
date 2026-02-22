// import { NextResponse } from "next/server"
// import { currentUser } from "@clerk/nextjs/server"
// import { writeClient } from "@/lib/sanity.write"

// export async function POST(req: Request) {
//   // ✅ ONLY CLERK AUTH USER
//   const clerkUser = await currentUser()

//   if (!clerkUser) {
//     return NextResponse.json(
//       { error: "Not authenticated" },
//       { status: 401 }
//     )
//   }

//   const formData = await req.formData()

//   const title = formData.get("title") as string
//   const content = formData.get("content") as string
//   const communityId = formData.get("communityId") as string
//   const media = formData.get("media") as File | null

//   // ✅ FIND SANITY USER USING CLERK ID ONLY
//   const sanityUser = await writeClient.fetch(
//     `*[_type=="user" && clerkId==$clerkId][0]`,
//     { clerkId: clerkUser.id }
//   )

//   if (!sanityUser) {
//     return NextResponse.json(
//       { error: "Sanity user not synced" },
//       { status: 400 }
//     )
//   }

//   // ✅ BASE POST DOC
//   const postDoc: any = {
//     _type: "post",
//     title,
//     content,
//     author: {
//       _type: "reference",
//       _ref: sanityUser._id,
//     },
//     community: communityId
//       ? { _type: "reference", _ref: communityId }
//       : undefined,
//   }

//   // ✅ IMAGE UPLOAD
//   if (media && media.size > 0) {
//     const asset = await writeClient.assets.upload("image", media)

//     postDoc.image = {
//       _type: "image",
//       asset: {
//         _type: "reference",
//         _ref: asset._id,
//       },
//     }
//   }

//   const post = await writeClient.create(postDoc)

//   return NextResponse.json({ success: true, post })
// }

// import { NextRequest, NextResponse } from 'next/server'
// import { currentUser } from '@clerk/nextjs/server'
// import { createClient } from '@sanity/client'

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: '2024-01-01',
//   token: process.env.SANITY_API_TOKEN,
//   useCdn: false,
// })

// export async function POST(req: NextRequest) {
//   try {
//     const user = await currentUser()
//     if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//     const formData = await req.formData()
//     const title = formData.get('title')?.toString() || ''
//     const content = formData.get('content')?.toString() || ''
//     const communityId = formData.get('communityId')?.toString() || ''

//     // ✅ safer check if user joined the community
//     const joinedMembers = await client.fetch(
//       `*[_type=="communityMember" && userId==$userId && community._ref==$communityId]`,
//       { userId: user.id, communityId }
//     )

//     if (!joinedMembers.length) {
//       return NextResponse.json({ error: 'Join community first' }, { status: 403 })
//     }

//     await client.create({
//       _type: 'post',
//       title,
//       content,
//       author: { _type: 'reference', _ref: user.id },
//       community: { _type: 'reference', _ref: communityId },
//       score: 0,
//     })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error('CREATE POST ERROR:', err)
//     return NextResponse.json({ error: 'Failed', status: 500 })
//   }
// }
import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const title = formData.get('title')?.toString() || ''
    const content = formData.get('content')?.toString() || ''
    const communityId = formData.get('communityId')?.toString() || ''
    const media = formData.get('media') as File | null

    // check if user joined community
    const joined = await client.fetch(
      `count(*[_type=="communityMember" && userId==$userId && community._ref==$communityId])>0`,
      { userId: user.id, communityId }
    )
    if (!joined) return NextResponse.json({ error: 'Join community first' }, { status: 403 })

    let mediaRef = undefined
if (media && media.size > 0) {
  if (media.type.startsWith('image/')) {
    const uploaded = await client.assets.upload('image', media, { filename: media.name })
    if (uploaded._id.startsWith('image-')) {
      mediaRef = { _type: 'image', asset: { _type: 'reference', _ref: uploaded._id } }
    } else {
      console.warn('Sanity returned non-image asset:', uploaded._id)
    }
  } else {
    console.warn('Uploaded file is not an image')
  }
}

await client.create({
  _type: 'post',
  title,
  content,
  author: { _type: 'reference', _ref: user.id },
  community: { _type: 'reference', _ref: communityId },
  score: 0,
  media: mediaRef, // ✅ store in new field
})

    

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('CREATE POST ERROR:', err)
    return NextResponse.json({ error: 'Failed', status: 500 })
  }
}