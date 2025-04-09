"use client";

import { COMPANY_NAME } from "@/info";
import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer lg:justify-start"
      onClick={() => router.push("/")}
    >
      <p className="text-xl font-semibold select-none md:text-2xl font-cal">
        {COMPANY_NAME}
      </p>
      <span className="font-semibold -mt-0.5 select-none">®</span>
    </div>
  );
};
