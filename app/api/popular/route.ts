// import { NextResponse } from "next/server"
// import { client } from "@/lib/sanity"
// import imageUrlBuilder from "@sanity/image-url"

// const builder = imageUrlBuilder(client)
// const urlFor = (src: any) => builder.image(src).url()

// export async function GET() {
//   const query = `
//     *[_type=="post" && (defined(media.asset) || defined(image.asset))]{
//       _id,
//       title,

//       // 👇 fallback logic
//       "image": coalesce(media, image),

//       "likes": count(*[_type=="like" && references(^._id)])
//     }
//     | order(likes desc)
//   `

//   const posts = await client.fetch(query)

//   const formatted = posts.map((post: any) => ({
//     _id: post._id,
//     title: post.title,
//     likes: post.likes,
//     imageUrl: post.image ? urlFor(post.image) : null,
//   }))

//   return NextResponse.json(formatted)
// }
// import { NextResponse } from "next/server";
// import { client } from "@/lib/sanity";
// import imageUrlBuilder from "@sanity/image-url";

// // Sanity image builder
// const builder = imageUrlBuilder(client);
// const urlFor = (src: any) => {
//   if (!src || !src._type || !src.asset?._ref) return null;
//   if (src._type === "image" && src.asset._ref.startsWith("image-")) {
//     return builder.image(src).url();
//   }
//   return null;
// };

// export async function GET() {
//   try {
//     // Fetch all posts with likes and both image fields
//     const query = `
//       *[_type=="post"]{
//         _id,
//         title,
//         media,
//         image,
//         "likes": count(*[_type=="like" && references(^._id)])
//       }
//     `;

//     const posts: any[] = await client.fetch(query);

//     // Map posts to include proper image URLs (media first, fallback to old image)
//     const mappedPosts = posts.map(post => ({
//       ...post,
//       imageUrl: urlFor(post.media) || urlFor(post.image) || null,
//     }));

//     // Sort posts by likes descending to get popular posts
//     mappedPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));

//     return NextResponse.json(mappedPosts);
//   } catch (err) {
//     console.error("POPULAR PAGE ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to load popular posts" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (src: any) => {
  if (!src || !src._type || !src.asset?._ref) return null;
  if (src._type === "image" && src.asset._ref.startsWith("image-")) {
    return builder.image(src).url();
  }
  return null;
};

export async function GET() {
  try {
    const query = `
  *[_type=="post"] | order(coalesce(score, 0) desc){
    _id,
    title,
    media,
    image,
    "score": coalesce(score, 0)
  }
`;

    const posts: any[] = await client.fetch(query);

    const mappedPosts = posts.map(post => ({
      ...post,
      likes: post.score || 0,
      imageUrl: urlFor(post.media) || urlFor(post.image) || null,
    }));

    return NextResponse.json(mappedPosts);
  } catch (err) {
    console.error("POPULAR PAGE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load popular posts" },
      { status: 500 }
    );
  }
}