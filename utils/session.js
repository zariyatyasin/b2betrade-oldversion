import { getServerSession } from "next-auth/next"
import {authOptions} from "../utils/authOptions"
export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    console.log("this is sesstion",session);
    return session?.user
  }