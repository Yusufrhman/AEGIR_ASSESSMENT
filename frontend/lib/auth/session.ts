import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";

export async function getUser() {
  const session = await getServerSession(options);
  return session?.user;
}
