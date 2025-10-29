import { Thread, ThreadContent } from "@/models/thread.model";
import { PostThread } from "@/service/thread.service";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    // Expecting body: { uploadedBy, plainText, html }
    const { uploadedBy, plainText, html } = body;

    const savedThread = await PostThread({ uploadedBy, plainText, html });

    return NextResponse.json({ success: true, thread: savedThread });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}


export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const uploadedBy = searchParams.get("uploadedBy");
    const query = searchParams.get("query");

    if (query) {
      const results = await Search({ query });
      return NextResponse.json({ success: true, data: results });
    }

    // 2️⃣ If "uploadedBy" param is provided — return user’s posts
    if (uploadedBy) {
      const posts = await MyPosts({ uploadedBy });
      return NextResponse.json({ success: true, data: posts });
    }

    const response = await GetPosts({ page, limit });
    return NextResponse.json({ success: true, ...response });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}





export async function DELETE(req){

}