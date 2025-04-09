import { COMPANY_NAME } from "@/info";
import Link from "next/link";
import React from "react";

export const AuthFormHeader = () => {
  return (
    <div>
      <Link href="/" aria-label="go home">
        {COMPANY_NAME}
      </Link>
      <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
        Create a {COMPANY_NAME} Account
      </h1>
      <p className="text-sm">Welcome! Create an account to get started</p>
    </div>
  );
};
