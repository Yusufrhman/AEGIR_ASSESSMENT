"use client";
import Validate from "@/lib/auth/Validate";
import { SessionProvider } from "next-auth/react";

export default function AdminProvider({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <Validate>{children}</Validate>
    </SessionProvider>
  );
}
