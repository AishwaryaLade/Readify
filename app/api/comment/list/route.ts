import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity.write";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId)
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const comments = await writeClient.fetch(
    `*[_type=="comment" && post._ref==$postId]{
      _id,
      text,
      parent->{_id},
      author->{_id, name},
      _createdAt
    }`,
    { postId }
  );

  return NextResponse.json(comments);
}
