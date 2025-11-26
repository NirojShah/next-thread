import { useSession } from "next-auth/react";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import VertNav from "./Components/VertNav";
import TopNav from "./Components/Navs/TopNav";
import Threads from "./page/threads/page";
import ProfilePage from "./Components/User Profile/UserProfile";
const page = async() => {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/login")
  }
  return (
    <div className="flex flex-col">
      <TopNav/>
      <div className="mt-[60px] mx-[16px] flex ">
        <div className="w-[15%] border border-red-500 h-[calc(100vh-60px)]">
          <ProfilePage/>
        </div>
        <div className="w-[70%] border border-blue-600 h-[calc(100vh-60px)] overflow-x-scroll">
          <Threads/>
        </div>
        <div className="w-[15%] border border- h-[calc(100vh-60px)]">test1</div>
      </div>
    </div>
  )
};

export default page;
