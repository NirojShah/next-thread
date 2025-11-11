import { useSession } from "next-auth/react";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import VertNav from "./Components/VertNav";
import TopNav from "./Components/Navs/TopNav";
const page = async() => {
  const session = await getServerSession(authOptions);
  console.log(session)
  if(!session){
    redirect("/login")
  }
  return (
    <div>
      {/* <VertNav/> */}
      <TopNav/>
    </div>
  )
};

export default page;
