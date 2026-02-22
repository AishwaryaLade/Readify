// import { NextResponse } from 'next/server'
// import { createClient } from '@sanity/client'

// const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: '2024-01-01',
//   token: process.env.SANITY_API_TOKEN, // MUST be WRITE token
//   useCdn: false,
// })

// export async function POST(request: Request) {
//   try {
//     // ✅ IMPORTANT CHANGE
//     const formData = await request.formData()

//     const name = formData.get('name') as string
//     const slug = formData.get('slug') as string
//     const description = formData.get('description') as string
//     const image = formData.get('image') as File | null

//     if (!name || !slug) {
//       return NextResponse.json(
//         { error: 'Name and slug are required' },
//         { status: 400 }
//       )
//     }

//     let imageRef = null

//     // Upload image if exists
//     if (image) {
//       const arrayBuffer = await image.arrayBuffer()
//       const buffer = Buffer.from(arrayBuffer)

//       const uploadedImage = await sanityClient.assets.upload(
//         'image',
//         buffer,
//         { filename: image.name }
//       )

//       imageRef = {
//         _type: 'image',
//         asset: {
//           _type: 'reference',
//           _ref: uploadedImage._id,
//         },
//       }
//     }

//     const community = await sanityClient.create({
//       _type: 'community',
//       name,
//       slug: {
//         _type: 'slug',
//         current: slug,
//       },
//       description,
//       image: imageRef,
//     })

//     return NextResponse.json({ success: true, community })
//   } catch (error) {
//     console.error('API ERROR:', error)
//     return NextResponse.json(
//       { error: 'Failed to create community' },
//       { status: 500 }
//     )
//   }
// }
// export async function GET() {
//   try {
//     const communities = await sanityClient.fetch(`
//       *[_type == "community"] | order(_createdAt desc) {
//         _id,
//         name,
//         "slug": slug.current
//       }
//     `)

//     return NextResponse.json(communities)
//   } catch (error) {
//     console.error('FETCH COMMUNITIES ERROR:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch communities' },
//       { status: 500 }
//     )
//   }
// }


// main code


import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

/* ===================== GET ===================== */
export async function GET() {
  try {
    const communities = await client.fetch(`
      *[_type == "community"] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current
      }
    `)

    return NextResponse.json(communities)
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch communities' },
      { status: 500 }
    )
  }
}

/* ===================== POST ===================== */
export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug required' },
        { status: 400 }
      )
    }

    const community = await client.create({
      _type: 'community',
      name,
      slug: { _type: 'slug', current: slug },
      description,
    })

    return NextResponse.json(community)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to create community' },
      { status: 500 }
    )
  }
}
