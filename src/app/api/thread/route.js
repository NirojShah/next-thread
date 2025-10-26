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
    const { searchParams } = new URL(req.url);
    const uploadedBy = searchParams.get("uploadedBy");
    const query = searchParams.get("query");

    let threads;

    if (uploadedBy) {
      threads = await MyPosts({ uploadedBy });
    } else if (query) {
      threads = await Search({ query });
    } else {
      threads = await Thread.find({}).populate("uploadedBy").lean();
    }

    return NextResponse.json({ success: true, threads });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}


export async function DELETE(req){

}