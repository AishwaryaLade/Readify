

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