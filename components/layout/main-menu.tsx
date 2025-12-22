"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinOff, MapPinCheck, MapPinPlus } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SearchBox from "@/components/layout/search-box";
import AuthControl from "@/components/layout/auth-control";
import Image from "next/image";
import Logo from "@/public/hb-logo-transparent.webp";
import { cn } from "@/lib/utils";

interface MainMenuProps {
  isLoggedIn: boolean;
  profilePicture?: string | null;
}

export default function MainMenu({ isLoggedIn, profilePicture }: MainMenuProps) {
  const viewport = false;
  const pathname = usePathname();

  const isActive = React.useCallback((href: string) => {
    if (!pathname) return false;
    
    // Normalize both paths by removing trailing slashes for comparison
    const normalizePath = (path: string) => path === "/" ? "/" : path.replace(/\/$/, "");
    const normalizedPathname = normalizePath(pathname);
    const normalizedHref = normalizePath(href);
    
    if (normalizedHref === "/") {
      return normalizedPathname === "/";
    }
    
    // For non-root paths, check if pathname exactly matches or is a sub-route
    return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`);
  }, [pathname]);

  return (
    <NavigationMenu viewport={viewport}
        className="pb-10"
    >
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <Link href="/">
            <Image
              src={Logo}
              alt="Hiking Buddies Logo"
              width="50"
              className="mr-2"
            />
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              isActive("/") && "bg-accent text-accent-foreground"
            )}
          >
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              isActive("/events/") && "bg-accent text-accent-foreground"
            )}
          >
            <Link href="/events/">Events</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              isActive("/routes/") && "bg-accent text-accent-foreground"
            )}
          >
            <Link href="/routes/">Routes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Organize event</NavigationMenuTrigger>
          <NavigationMenuContent className="absolute min-w-fit z-99">
              <NavigationMenuLink href="#">
                <div className="flex text-nowrap gap-2">
                  <MapPinPlus className="float-left" />
                  Create new route
                </div>
              </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div className="flex text-nowrap gap-2">
                <MapPinCheck/>
                Use existing route
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div className="flex text-nowrap gap-2">
                <MapPinOff/>
                Non-hiking event
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div className="flex flex-nowrap gap-4">
          <SearchBox/>
          <AuthControl isLoggedIn={isLoggedIn} profilePicture={profilePicture} />
        </div>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

