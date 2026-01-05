"use client";

import { useState } from "react";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const computeRedirectTarget = (searchParams: ReadonlyURLSearchParams) => {
  const redirect = searchParams.get("redirect");
  if (redirect?.startsWith("/")) {
    return redirect;
  }
  return routes.pages.home;
};

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(routes.api.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred. Please try again later.");
        setIsLoading(false);
        return;
      }

      // Redirect to home on success
      router.push(computeRedirectTarget(searchParams));
      router.refresh();
    } catch {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner className="w-4 h-4 text-primary-foreground" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </form>
  );
}
