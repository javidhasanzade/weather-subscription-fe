import { z } from "zod";

export const customerSignUpSchema = z.object({
  email: z.string().email("Customer email is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().optional(),
});

export const customerLoginSchema = z.object({
  email: z.string().email("Customer email is required"),
});

export type customerSignUpFormValues = z.infer<typeof customerSignUpSchema>;
export type customerLoginFormValues = z.infer<typeof customerLoginSchema>;
