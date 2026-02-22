import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  const query = `
    *[_type == "post" && defined(image.asset)]{
      _id,
      title,
      "imageUrl": image.asset->url,
      "likes": count(*[_type=="like" && references(^._id)])
    }
    | order(likes desc)
  `;

  const posts = await client.fetch(query);
  return NextResponse.json(posts);
}
