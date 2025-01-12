"use client"
import Link from "next/link";
import React from "react";

function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center text-teal-500">
      <div className="text-center">
        <h1 className="text-6xl font-bold">An Error occured.</h1>
        <p className="mt-4 text-xl"></p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 rounded-md text-white bg-teal-700 hover:bg-teal-600 transition duration-300"
        >
          try again
        </Link>
      </div>
    </div>
  );
}

export default ErrorBoundary;
