"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { routes } from "@/lib/routes";

interface AuthControlProps {
  isLoggedIn: boolean;
  profilePicture?: string | null;
}

const AuthControl = ({ isLoggedIn, profilePicture }: AuthControlProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch(routes.api.auth.logout, { method: "POST" });
    router.push(routes.pages.home);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      {isLoggedIn ? (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring p-0 h-auto [&>svg]:hidden">
            <Avatar className="h-9 w-9">
              <AvatarImage src={profilePicture ?? undefined} alt="Profile" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute min-w-fit z-99">
            <NavigationMenuLink href="#" className="flex text-nowrap gap-2">
              Profile
            </NavigationMenuLink>
            <NavigationMenuLink
              onClick={(e) => {
                e.preventDefault();
                handleSignOut();
              }}
              href="#"
              className="flex text-nowrap gap-2"
            >
              Sign out
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ) : (
        <Button variant="outline" className="cursor-pointer" asChild>
          <Link href="/signin">Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default AuthControl;
