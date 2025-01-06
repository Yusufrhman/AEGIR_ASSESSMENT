
import LoginForm from "@/components/AuthForm";
import H1 from "@/components/H1";

export default function LoginPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="text-center flex flex-col gap-5 mx-6 w-full max-w-[20rem]">
        <H1>Login</H1>
        <LoginForm />
      </section>
    </main>
  );
}
