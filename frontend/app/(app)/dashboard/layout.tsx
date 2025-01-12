import { options } from "@/lib/auth/options";
import AdminProvider from "@/components/AdminProvider";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

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
        <header className="w-full h-[5rem] bg-custom-teal sticky top-0 z-50"></header>
        <main className="w-[90%] mx-auto h-full">{children}</main>
      </AdminProvider>
    </ReactQueryClientProvider>
  );
}
