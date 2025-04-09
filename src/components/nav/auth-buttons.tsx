"use client";

import { getUserData } from "@/actions/get-user-data";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutSubscription } from "@/actions/subscription";

export const AuthButtons = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user_query = useQuery({ queryKey: ["user"], queryFn: getUserData });
  const { isLoading } = user_query;

  if (isLoading)
    return (
      <div className="flex justify-end w-ful">
        <Button
          variant="outline"
          onClick={() => router.push("/sign-up")}
          className="gap-4"
        >
          Loading... <Loader2 className="animate-spin size-4" />
        </Button>
      </div>
    );

  if (!user_query.data)
    return (
      <div className="flex justify-end w-full gap-4">
        <Button variant="outline" onClick={() => router.push("/sign-up")}>
          Sign up
        </Button>
      </div>
    );

  return (
    <div className="flex justify-end w-full gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{user_query.data.email}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            onClick={() => {
              logoutSubscription();
              queryClient.removeQueries({ queryKey: ["user"] });
              router.push("/sign-in");
            }}
          >
            Logout
            <DropdownMenuShortcut>Alt+l</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
