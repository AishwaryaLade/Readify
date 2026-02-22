// app/api/user-joined/route.ts
// app/api/community/user-joined/route.ts
// app/api/community/user-joined/route.ts
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { client } from "@/lib/sanity";

export async function GET(req: Request) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ communities: [] });
  }

  try {
    // Fetch all communities this user has joined
    const communityMembers = await client.fetch(
      `*[_type == "communityMember" && userId == $userId]{
        "communityId": community->_id,
        "name": community->name,
        "joinedAt": joinedAt
      } | order(joinedAt desc)`,
      { userId }
    );

    // Remove duplicates in JS (in case the user has multiple entries for the same community)
    const seen = new Set();
    const communities = communityMembers.filter(cm => {
      if (seen.has(cm.communityId)) return false;
      seen.add(cm.communityId);
      return true;
    });

    return NextResponse.json({ communities });
  } catch (error) {
    console.error("Error fetching user communities:", error);
    return NextResponse.json({ communities: [], error: "Failed to fetch communities" });
  }
}