// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { writeClient } from "@/lib/sanity.write";

// export async function POST(req: Request) {
//   try {
//     // Use Clerk cookie to get userId
//     const { userId } = getAuth(req);
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { communityId } = await req.json();
//     if (!communityId)
//       return NextResponse.json({ error: "Community ID required" }, { status: 400 });

//     // Prevent duplicate
//     const existing = await writeClient.fetch(
//       `*[_type=="communityMember" && userId==$userId && community._ref==$communityId][0]{_id}`,
//       { userId, communityId }
//     );
//     if (existing)
//       return NextResponse.json({ success: false, message: "Already joined" }, { status: 400 });

//     await writeClient.create({
//       _type: "communityMember",
//       userId,
//       community: { _type: "reference", _ref: communityId },
//       joinedAt: new Date().toISOString(),
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Join API error:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { writeClient } from "@/lib/sanity.write";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { communityId } = await req.json();
    if (!communityId) return NextResponse.json({ error: "Community ID required" }, { status: 400 });

    // Check for duplicate join
    const existing = await writeClient.fetch(
      `*[_type=="communityMember" && userId==$userId && community._ref==$communityId][0]{_id}`,
      { userId, communityId }
    );

    if (existing) return NextResponse.json({ success: false, message: "Already joined" }, { status: 400 });

    await writeClient.create({
      _type: "communityMember",
      userId,
      community: { _type: "reference", _ref: communityId },
      joinedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Join API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
