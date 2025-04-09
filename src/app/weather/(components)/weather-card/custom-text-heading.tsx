import { cn } from "@/lib/utils";
import React from "react";

export interface CustomTextHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const CustomTextHeading = ({
  children,
  className,
}: CustomTextHeadingProps) => {
  return (
    <h5
      className={cn(
        "px-4 text-white flex flex-col text-5xl w-fit leading-tight font-light font-[family-name:var(--font-main)]",
        className
      )}
    >
      {children}
    </h5>
  );
};
