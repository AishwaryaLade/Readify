import PostFeed from "./components/PostFeed"

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/display-post", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to load posts")
  }

  const posts = await res.json()

  return (
    <main className="flex gap-6">
      <PostFeed posts={posts} />
    </main>
  )
}
