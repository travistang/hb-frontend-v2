"use client";

import React, { useMemo } from "react";
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

const NavigationItem = ({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    if (!href) return false;
    return pathname === href;
  }, [href, pathname]);
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          navigationMenuTriggerStyle(),
          "cursor-pointer",
          isActive
            ? "font-bold bg-accent text-accent-foreground"
            : "text-primary",
          className
        )}
      >
        <Link href={href ?? "/"}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
export default function MainMenu({
  isLoggedIn,
  profilePicture,
}: MainMenuProps) {
  const viewport = false;

  return (
    <NavigationMenu viewport={viewport} className="pb-10 w-full">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="hover:bg-transparent active:bg-transparent cursor-pointer">
          <NavigationMenuLink
            asChild
            className="hover:bg-transparent active:bg-transparent cursor-pointer"
          >
            <Link href="/">
              <Image
                src={Logo}
                alt="Hiking Buddies Logo"
                width="50"
                className="mr-2"
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationItem className={navigationMenuTriggerStyle()} href="/">
          Home
        </NavigationItem>
        <NavigationItem className={navigationMenuTriggerStyle()} href="/events">
          Events
        </NavigationItem>
        <NavigationItem className={navigationMenuTriggerStyle()} href="/routes">
          Routes
        </NavigationItem>

        <NavigationMenuItem className="text-accent-foreground">
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
                <MapPinCheck />
                Use existing route
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="#">
              <div className="flex text-nowrap gap-2">
                <MapPinOff />
                Non-hiking event
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div className="flex flex-nowrap gap-4">
          <SearchBox />
          <AuthControl
            isLoggedIn={isLoggedIn}
            profilePicture={profilePicture}
          />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
