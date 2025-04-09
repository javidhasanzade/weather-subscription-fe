"use server";
import { createSubscriptionSuccessData } from "@/types/types";

import { cookies } from "next/headers";

export const getUserData = async (): Promise<createSubscriptionSuccessData> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  let session: createSubscriptionSuccessData | null = null;

  if (sessionCookie) {
    try {
      session = JSON.parse(
        sessionCookie.value
      ) as createSubscriptionSuccessData;
    } catch (err) {
      console.error("Failed to parse session cookie:", err);
    }
  }

  return session as createSubscriptionSuccessData;
};
