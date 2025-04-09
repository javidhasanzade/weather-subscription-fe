import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  verticalMargin?: boolean;
}

export const Container = ({
  children,
  className,
  verticalMargin = false,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        `mx-auto w-full max-w-[1440px] px-4 md:px-[34px]
      relative`,
        verticalMargin && "my-[75px]",
        className
      )}
    >
      {children}
    </div>
  );
};
