"use client";

import Link from "next/link";
import React, { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthFormHeader } from "./form-header";
import { CountryDropdown } from "../ui/country-dropdown";
import { CityDropdown } from "../ui/city-dropdown";

import { createSubscription } from "@/actions/subscription";
import { useSignUpForm } from "./hooks/use-signup-form";
import { customerSignUpFormValues } from "./schemas/auth-schemas";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const {
    form,
    selectedCountry,
    setSelectedCountry,
    cityList,
    isCitiesLoading,
  } = useSignUpForm();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null); // Add state for error

  const onSubmit = async (data: customerSignUpFormValues) => {
    setFormError(null); // Clear previous errors
    try {
      const result = await createSubscription(data);
      console.log(result?.data);
      if (result?.message) {
        setFormError(
          result.message || "Something went wrong. Please try again."
        );
        return;
      }
      if (result?.data) {
        toast.success("Subscription created successfully!");
        router.push("/sign-in");
      }
    } catch (error: any) {
      setFormError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <AuthFormHeader />
          <hr className="my-4 border-dashed" />
          {formError && (
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

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountryDropdown
                      placeholder="Country"
                      defaultValue={field.value}
                      onChange={(country) => {
                        form.setValue("city", "");
                        setSelectedCountry(country);
                        field.onChange(country.alpha3);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Select your country.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={selectedCountry === null}
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <CityDropdown
                      disabled={selectedCountry === null}
                      options={cityList}
                      placeholder="City i.e: New York"
                      defaultValue={field.value}
                      isLoading={isCitiesLoading}
                      onChange={(city) => {
                        field.onChange(city);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Select your city.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account?
            <Button asChild variant="link" className="px-2">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
};
