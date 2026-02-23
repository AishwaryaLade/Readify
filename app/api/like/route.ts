



import { NextResponse } from "next/server"
import { writeClient } from "@/lib/sanity.write"

export async function POST(req: Request) {
  try {
    const { postId, value } = await req.json()

    if (!postId || typeof value !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    await writeClient
      .patch(postId)
      .setIfMissing({ score: 0 })
      .inc({ score: value })  // 🔥 ALWAYS increment
      .commit()

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}