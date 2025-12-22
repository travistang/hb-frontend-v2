import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthState } from "@/lib/auth";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Sign In - Hiking Buddies",
};

export default async function SignInPage() {
  const auth = await getAuthState();

  // Redirect to home if already logged in
  if (auth.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="prose w-full max-w-none">
      <h1>Sign In</h1>
      <p className="text-muted-foreground">
        Enter your email and password to sign in to your account.
      </p>
      <div className="not-prose mt-6 max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}

