import { Thread } from "@/models/thread.model";
import { NextResponse } from "next/server";

export async function PostThread({ uploadedBy, plainText, html }) {
  try {
    const thread = new Thread({
      uploadedBy,
      plainText,
      html,
    });
    const savedThread = await thread.save();
    return savedThread; // You may return savedThread._id or anything else
  } catch (error) {
    throw error; // You may handle error differently if needed
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

export async function MyPosts() {}

export async function DeletePost() {}

export async function Search() {}
