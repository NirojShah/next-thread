import { connectDB } from "@/lib/mongodb";
import {
  AllUsers,
  CreateUser,
  DeactivateUser,
  UpdateUser,
  UserInfo,
} from "@/service/user.service";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const resp = await CreateUser(body);

    return NextResponse.json({
      status: true,
      resp,
    });
  } catch (err) {
    return NextResponse.json(
      { status: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("fetch");
    const email = searchParams.get("email");
    let response;
    if (type == "all") {
      response = await AllUsers();
    } else {
      response = await UserInfo(email);
    }
    return NextResponse.json({
      success: true,
      users: response,
    });
  } catch (err) {}
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
      throw new Error("Email is required.");
    }
    const response = await UpdateUser(email, body);
    return NextResponse.json({
      success: true,
      response,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}

export async function DELETE(req) {
  try{
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is requred.",
      });
    }
    
    const resp = await DeactivateUser(email)
    if(resp){
      return NextResponse.json({
        success: true,
        message:`${email} is deleted.`
      })
    }
  }catch(err){
    return NextResponse.json({
      success: false,
      message: err.message
    })
  }

}
