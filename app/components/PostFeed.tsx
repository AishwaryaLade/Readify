"use client"

import PostCard from "./PostCard"

export default function PostFeed({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) {
    return <p className="text-neutral-400">No posts yet</p>
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
