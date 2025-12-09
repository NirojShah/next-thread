import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TopNav from "./Components/Navs/TopNav";
import ResizableLayout from "./ResizableLayout";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col">
      <TopNav />
      <div className="mt-[60px] mx-[16px] h-[calc(100vh-60px)]">
        <ResizableLayout />
        
      </div>
    </div>
  );
};

export default page;
