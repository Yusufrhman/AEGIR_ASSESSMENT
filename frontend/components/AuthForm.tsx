"use client";

import MainButton from "./buttons/MainButton";
import FormInput from "./FormInput";
import Loader from "./Loader";
import { validateForm } from "@/lib/utils/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isError, setIsError] = useState({ email: "", password: "" });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const enteredData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        enteredData[key] = value;
      }
    });

    const errors = validateForm(enteredData);
    if (errors.email || errors.password) {
      setIsError(errors);
      return;
    }
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: enteredData.email,
      password: enteredData.password,
      callbackUrl: `/`,
      redirect: false,
    });
    if (res?.error) {
      setIsError({ email: res?.error, password: res?.error });
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <FormInput
        id="email"
        type="email"
        placeholder="example@example.com"
        isError={isError.email !== ""}
        errorMessage={isError.email}
      />
      <FormInput
        id="password"
        type="password"
        placeholder="*********"
        isError={isError.password !== ""}
        errorMessage={isError.password}
      />
      <MainButton
        type="submit"
        className={`flex items-center justify-center ${
          isLoading && "opacity-65 hover:opacity-65"
        }`}
        disabled={isLoading}
      >
        {isLoading ? <Loader color="white" /> : "Sign in"}
      </MainButton>
    </form>
  );
}
