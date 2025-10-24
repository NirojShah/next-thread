import { Thread } from "@/models/thread.model";
import { NextResponse } from "next/server";

export async function PostThread({ uploadedBy, plainText, html }) {
  try {
    const thread = new Thread({
      uploadedBy,
      plainText,
      html
    });
    const savedThread = await thread.save();
    return savedThread; // You may return savedThread._id or anything else
  } catch (error) {
    throw error; // You may handle error differently if needed
  }
}

export async function GetPosts(){

}

export async function MyPosts(){

}

export async function DeletePost(){

}

export async function Search() {
    
}