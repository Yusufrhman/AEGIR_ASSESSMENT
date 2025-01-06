"use client";

import { validateEmail, validatePassword } from "@/lib/utils/validation";
import MainButton from "./buttons/MainButton";
import FormInput from "./FormInput";
import axios from "axios";

export default function LoginForm() {
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Convert FormData to a plain object with only string values
    const enteredData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        enteredData[key] = value;
      }
    });

    // Validate user input
    let isError = { email: "", password: "" };

    isError.email = validateEmail(enteredData.email);
    isError.password = validatePassword(enteredData.password);

    if (isError.email || isError.password) {
      console.log("There are errors in the form:", isError);
      return;
    }

    const loginData = {
      email: enteredData.email,
      password: enteredData.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8055/auth/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
  return (
    <form onSubmit={login} className="flex flex-col gap-4">
      <FormInput id="email" type="email" placeholder="example@example.com" />
      <FormInput id="password" type="password" placeholder="*********" />
      <MainButton type="submit" onClick={() => {}}>
        Sign in
      </MainButton>
    </form>
  );
}
