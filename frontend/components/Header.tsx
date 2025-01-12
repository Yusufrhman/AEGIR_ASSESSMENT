"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    return (
      <header className="w-full bg-custom-teal sticky top-0 z-50">
        <div className="text-white py-5 w-[90%] mx-auto flex items-center justify-between">
          <p></p>
          <Link href={"/dashboard"}>Dashboard</Link>
          <button
            onClick={() => {
              signOut();
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </header>
    );
}