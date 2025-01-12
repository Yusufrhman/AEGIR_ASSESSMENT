import { options } from "@/lib/auth/options";
import AdminProvider from "@/components/AdminProvider";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

import Header from "@/components/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!session) {
    return redirect("/login");
  }
  return (
    <ReactQueryClientProvider>
      <AdminProvider session={session}>
        <Header />
        <main className="w-[90%] mx-auto h-full">{children}</main>
      </AdminProvider>
    </ReactQueryClientProvider>
  );
}
