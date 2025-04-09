"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useLoginForm } from "./hooks/use-login-form";
import { AuthFormHeader } from "./form-header";
import { loginSubscription } from "@/actions/subscription";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { customerLoginFormValues } from "./schemas/auth-schemas";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const SignInForm = () => {
  const { form } = useLoginForm();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null); // Add state for error

  const onSubmit = async (data: customerLoginFormValues) => {
    setFormError(null);
    try {
      const result = await loginSubscription(data);
      if (result?.message) {
        setFormError(
          result.message || "Something went wrong. Please try again."
        );
      }
      if (result?.data) {
        toast.success("Logged in successfully!");
        router.push("/weather");
      }
    } catch (error: any) {
      setFormError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        className="max-w-92 m-auto h-fit w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="p-8 pb-6">
          <AuthFormHeader />
          <hr className="my-4 border-dashed" />
          {formError && typeof formError === "string" && (
            <Alert variant="destructive" className="mb-5">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          Don't have an account ?
          <Button asChild variant="link" className="px-2">
            <Link href="/sign-up">Create account</Link>
          </Button>
        </p>
      </form>
    </Form>
  );
};
