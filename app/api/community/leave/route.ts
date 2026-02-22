import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { writeClient } from "@/lib/sanity.write";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { communityId } = await req.json();
    if (!communityId) return NextResponse.json({ error: "Community ID required" }, { status: 400 });

    // Find the communityMember document
    const member = await writeClient.fetch(
      `*[_type=="communityMember" && userId==$userId && community._ref==$communityId][0]{_id}`,
      { userId, communityId }
    );

    if (member) {
      await writeClient.delete(member._id); // Remove membership
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Not a member" });
  } catch (err) {
    console.error("Leave API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
