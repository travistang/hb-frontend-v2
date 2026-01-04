import { cookies } from "next/headers";
import { User, UserServiceProvider } from "./types";
import constants from "./constants";

export class CookieUserServiceProvider implements UserServiceProvider {
  async authenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(constants.cookies.authToken)?.value;
    return Boolean(authToken);
  }

  async getMe(): Promise<User | null> {
    if (!this.authenticated()) {
      return null;
    }

    try {
      const cookieStore = await cookies();
      const pk = cookieStore.get(constants.cookies.pk)?.value;
      const username = cookieStore.get(constants.cookies.username)?.value;
      const profilePicture = cookieStore.get(
        constants.cookies.profilePicture
      )?.value;

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

      cookieStore.set(constants.cookies.authToken, data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      cookieStore.set(constants.cookies.pk, data.pk.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      cookieStore.set(constants.cookies.username, data.username, {
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
      cookieStore.delete(constants.cookies.authToken);
      cookieStore.delete(constants.cookies.pk);
      cookieStore.delete(constants.cookies.username);
      cookieStore.delete(constants.cookies.profilePicture);
    } catch (error) {
      console.error("Error clearing cookies:", error);
    }
  }

  async getUserById(id: number): Promise<User | null> {
    throw new Error("not-implemented");
  }
}
