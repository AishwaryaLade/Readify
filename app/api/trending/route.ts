import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

const urlFor = (src: any) => {
  if (!src || !src.asset?._ref) return null;
  return builder.image(src).url();
};

export async function GET() {
  try {
    const query = `
      *[_type == "post"]
      | order(coalesce(score, 0) desc){
        _id,
        title,
        media,
        image,
        "score": coalesce(score, 0)
      }
    `;

    const posts = await client.fetch(query);

    const mappedPosts = posts
      .map((post: any) => ({
        _id: post._id,
        title: post.title,
        imageUrl: urlFor(post.media) || urlFor(post.image),
        likes: post.score,
      }))
      .filter((post: any) => post.imageUrl); // 🔥 only posts with image

    return NextResponse.json(mappedPosts);
  } catch (error) {
    console.error("TRENDING ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load trending posts" },
      { status: 500 }
    );
  }
}