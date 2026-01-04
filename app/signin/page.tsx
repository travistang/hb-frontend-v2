import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInForm } from "./signin-form";
import userService from "@/services/user-service";

export const metadata: Metadata = {
  title: "Sign In - Hiking Buddies",
};

export default async function SignInPage() {
  const me = await userService.getMe();

  // Redirect to home if already logged in
  if (me !== null) {
    redirect("/");
  }

  return (
    <div className="prose w-full max-w-none">
      <h1>Sign In</h1>
      <p className="text-muted-foreground">
        Enter your email and password to sign in to your account.
      </p>
      <div className="not-prose mt-6">
        <SignInForm />
      </div>
    </div>
  );
}
