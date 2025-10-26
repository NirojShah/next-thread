import { connectDB } from "@/lib/mongodb";
import { CreateUser } from "@/service/user.service";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const session = await mongoose.startSession();
    session.startTransaction();
  try {
    const body = await req.json();

    const resp = await CreateUser({body},session)

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
        status:true,
        resp
    })

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
return NextResponse.json(
      { status: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {

}

export async function PATCH() {
  
}
