import { Thread, ThreadContent } from "@/models/thread.model";
import { NextResponse } from "next/server";

export async function PostThread({ uploadedBy, plainText, html }) {
  try {
    console.log(uploadedBy, plainText, html);
    const thread = new Thread({
      uploadedBy,
      plainText,
      html,
    });

    const fileUpload = await new ThreadContent({});

    throw new Error("testing");
    // const savedThread = await thread.save();
    const savedThread = 100;
    return savedThread;
  } catch (error) {
    throw error;
  }
}

export async function GetPosts({
  page = 1,
  limit = 10,
  filter = {},
  sort = { createdAt: -1 },
}) {
  try {
    const skip = (page - 1) * limit;
    const posts = await Thread.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await Thread.countDocuments(filter);
    return {
      data: posts,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw error;
  }
}

export async function MyPosts({ uploadedBy }) {
  const posts = await Thread.find({ uploadedBy }).populate("uploadedBy").lean();
  return posts;
}

export async function DeletePost({ _id }) {
  try {
    const deleted = await Thread.findByIdAndDelete(_id);
    return deleted;
  } catch (error) {
    throw error;
  }
}

export async function Search({ query }) {
  const results = await Thread.find({ $text: { $search: query } }).lean();
  return results;
}
