import { cn } from "@/lib/utils";
import React from "react";

interface PageWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className={cn("flex min-h-screen flex-col relative", className)}>
      {children}
    </div>
  );
};
