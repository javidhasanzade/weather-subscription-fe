"use server";

import {
  customerLoginFormValues,
  customerSignUpFormValues,
} from "@/components/forms/schemas/auth-schemas";
import { createSubscriptionResponse, loginResponse } from "@/types/types";
import { cookies } from "next/headers";

export const createSubscription = async (
  values: customerSignUpFormValues
): Promise<createSubscriptionResponse | undefined> => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (res.ok) {
      return { data: data };
    } else {
      return { message: data.message };
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

export const loginSubscription = async (
  values: customerLoginFormValues
): Promise<loginResponse | undefined> => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/subscriptions/${values.email}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();

    if (res.ok) {
      const cookieStore = await cookies();
      cookieStore.set("session", JSON.stringify(data), {
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
      });

      return { data: data };
    } else {
      return { message: data.message };
    }
  } catch (error) {
    return { message: "Pizdes prayzashol" };
  }
};

export const logoutSubscription = async (): Promise<void> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};
