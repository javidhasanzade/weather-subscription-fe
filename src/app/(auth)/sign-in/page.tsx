import { SignInForm } from "@/components/forms/sign-in-form";

export default function SignInPage() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <SignInForm />
    </section>
  );
}
