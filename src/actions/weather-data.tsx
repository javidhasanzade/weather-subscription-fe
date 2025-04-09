"use server";

import {
  createSubscriptionSuccessData,
  getWeatherDataResponse,
} from "@/types/types";
import { cookies } from "next/headers";

export const getWeatherData = async (): Promise<getWeatherDataResponse> => {
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

  if (!session) {
    return { message: "Session not found" };
  }

  const res = await fetch(
    `http://localhost:5000/api/v1/weather?email=${session.email}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    return { data: data };
  } else {
    return { message: data.message };
  }
};
