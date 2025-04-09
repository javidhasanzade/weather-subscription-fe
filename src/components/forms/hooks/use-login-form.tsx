import { Country } from "@/components/ui/country-dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  customerLoginFormValues,
  customerLoginSchema,
} from "../schemas/auth-schemas";

export const useLoginForm = () => {
  const form = useForm<customerLoginFormValues>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      email: "",
    },
  });

  return {
    form,
  };
};
