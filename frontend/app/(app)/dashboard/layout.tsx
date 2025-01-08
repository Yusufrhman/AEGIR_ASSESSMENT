import { options } from "@/lib/auth/options";
import AdminProvider from "@/components/AdminProvider";

import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return <AdminProvider session={session}>{children}</AdminProvider>;
}
