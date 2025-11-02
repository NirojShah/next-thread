import { connectDB } from "@/lib/mongodb";
import { Thread, ThreadContent } from "@/models/thread.model";
import { GetPosts, PostThread } from "@/service/thread.service";
import AuthenticateUser from "@/utility/auth-middleware";
import formidable from "formidable";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const form = formidable({ multiples: false });

    const fields = await form
    let files

    console.log(fields)
    const { uploadedBy, plainText, html } = fields; // 🔥 Extract text fields
    console.log({ uploadedBy, plainText, html, files });

    const savedThread = await PostThread({ uploadedBy, plainText, html });

    return NextResponse.json({ success: true, thread: savedThread });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
export async function GET(req) {
  try {
    await connectDB();
    // const resp = await AuthenticateUser(req)
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const uploadedBy = searchParams.get("uploadedBy");
    const query = searchParams.get("query");

    if (query) {
      const results = await Search({ query });
      return NextResponse.json({ success: true, data: results });
    }

    if (uploadedBy) {
      const posts = await MyPosts({ uploadedBy });
      return NextResponse.json({ success: true, data: posts });
    }

    const response = await GetPosts({ page, limit });
    return NextResponse.json({ success: true, ...response });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Post ID is required" },
        { status: 400 }
      );
    }

    const deleted = await DeletePost({ _id });
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { id } = req.params;
}
