"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationItems } from "./nav-items";

export const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex items-end justify-end w-12 shrink lg:hidden">
      <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {isOpen && (
        <div className="container absolute right-0 flex flex-col w-full gap-8 p-4 border-t shadow-lg top-20 bg-background">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <div className="flex flex-col gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between"
                  >
                    <span className="text-lg">{item.title}</span>
                  </Link>
                ) : (
                  <p className="text-lg">{item.title}</p>
                )}
                {item.items &&
                  item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
