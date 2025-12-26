import { cookies } from "next/headers";
import { User, UserServiceProvider } from "./types";

export class CookieUserServiceProvider implements UserServiceProvider {
  async getMe(): Promise<User | null> {
    try {
      const cookieStore = await cookies();
      const pk = cookieStore.get("pk")?.value;
      const username = cookieStore.get("username")?.value;
      const profilePicture = cookieStore.get("profilePicture")?.value;

      if (!pk || !username) {
        return null;
      }

      return {
        id: parseInt(pk, 10),
        username,
        profile_picture: profilePicture ? [profilePicture] : undefined,
      };
    } catch (error) {
      console.error("Error getting user from cookies:", error);
      return null;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    // This still integrates with the actual backend
    const API_BASE_URL =
      process.env.API_BASE_URL || "https://www.hiking-buddies.com";

    try {
      const response = await fetch(`${API_BASE_URL}/api/routes/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 401) {
        return false;
      }

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Set cookies in the current request context
      const cookieStore = await cookies();

      cookieStore.set("authToken", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      cookieStore.set("pk", data.pk.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      cookieStore.set("username", data.username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      const cookieStore = await cookies();

      // Clear all auth cookies
      cookieStore.delete("authToken");
      cookieStore.delete("pk");
      cookieStore.delete("username");
      cookieStore.delete("profilePicture");
    } catch (error) {
      console.error("Error clearing cookies:", error);
    }
  }

  async getUserById(id: number): Promise<User | null> {
    throw new Error("not-implemented");
  }
}
