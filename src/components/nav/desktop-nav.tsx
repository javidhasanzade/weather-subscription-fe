import { MoveRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { navigationItems } from "./nav-items";

export const DesktopNav = () => {
  return (
    <div className="flex-row items-center justify-start hidden gap-4 lg:flex">
      <NavigationMenu className="flex items-start justify-start">
        <NavigationMenuList className="flex flex-row justify-start gap-4">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.href ? (
                <NavigationMenuLink>
                  <Button variant="ghost">{item.title}</Button>
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[450px] p-4">
                    <div className="flex flex-col grid-cols-2 gap-4 lg:grid">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col">
                          <p className="text-base">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        {item.cta}
                      </div>
                      <div className="flex flex-col justify-end h-full text-sm">
                        {item.items?.map((subItem) => (
                          <NavigationMenuLink
                            href={subItem.href}
                            key={subItem.title}
                            className="flex flex-row items-center justify-between px-4 py-2 rounded hover:bg-muted"
                          >
                            <span>{subItem.title}</span>
                            <MoveRight className="w-4 h-4 text-muted-foreground" />
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
