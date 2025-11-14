import { connectDB } from "@/lib/mongodb";
import { Thread, ThreadContent } from "@/models/thread.model";
import { User } from "@/models/user.model";
import { GetPosts, MyPosts, PostThread } from "@/service/thread.service";
import AuthenticateUser from "@/utility/auth-middleware";
import formidable from "formidable";
import { SessionContext } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const uploadedBy = formData.get("uploadedBy");
    const plainText = formData.get("plainText");
    const html = formData.get("html");
    const visibility = formData.get("visibility");
    const visibleTo = formData.get("visibleTo");
    const file = formData.get("file");

    let fileContentId = null;

    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Data = buffer.toString("base64");

        const threadContent = await ThreadContent.create({
          data: base64Data,
          contentType: file.type,
          fileName: file.name,
        });

        fileContentId = threadContent._id;
      } catch (fileError) {
        console.error("Error processing file:", fileError);
      }
    }
    const getUserInfo = await User.findOne({
      email: uploadedBy
    }).select("_id")

    const thread = new Thread({
      uploadedBy: getUserInfo._id,
      plainText,
      html,
      visibility: visibility || "public",
      visibleTo: visibleTo ? JSON.parse(visibleTo) : null,
      file: fileContentId, 
    });

    const savedThread = await thread.save();
    
    await savedThread.populate("uploadedBy", "name username email");
    if (fileContentId) {
      await savedThread.populate("file");
    }
    return NextResponse.json(
      { success: true, thread: savedThread },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating thread:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
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

    if (uploadedBy) {
      const posts = await MyPosts({ uploadedBy, page,limit });
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
