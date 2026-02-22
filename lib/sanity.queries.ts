import { client } from "./sanity";

export async function getPopularPosts() {
  return await client.fetch(`
    *[_type == "post"]{
      _id,
      title,
      slug,
      "likeCount": count(*[
        _type == "like" &&
        references(^._id)
      ])
    } | order(likeCount desc)
  `);
}

export async function getTrendingPosts() {
  return await client.fetch(`
    *[_type == "post"]{
      _id,
      title,
      slug,
      "likeCount": count(*[
        _type == "like" &&
        references(^._id) &&
        _createdAt > now() - 60*60*24*7
      ])
    } | order(likeCount desc)
  `);
}
