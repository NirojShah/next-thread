import { NextResponse } from "next/server";
import { createComment, getCommentsByThread, deleteComment } from "@/services/comment.service.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { threadId, commentedBy, commentText, parentCommentId, attachments } = body;

    if (!threadId || !commentedBy || !commentText) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const comment = await createComment({ threadId, commentedBy, commentText, parentCommentId, attachments });
    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return NextResponse.json({ error: "threadId query parameter is required." }, { status: 400 });
    }

    const comments = await getCommentsByThread({ threadId });
    return NextResponse.json({ success: true, comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

