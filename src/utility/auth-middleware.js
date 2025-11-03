import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function AuthenticateUser(req) {
    const x = await getServerSession(authOptions)
    console.log(x)
    return true
}

export default AuthenticateUser;
