"use client"
import { ReactNode, ButtonHTMLAttributes } from "react";

type MainButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function MainButton({
  children,
  className = "",
  ...props
}: MainButtonProps) {
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 bg-gradient-to-r from-custom-teal to-custom-darkTeal text-white rounded-md hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
