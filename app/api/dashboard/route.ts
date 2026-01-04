import constants from "@/services/user-service/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://www.hiking-buddies.com";

// TODO: Move this into dashboard service
export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(constants.cookies.authToken)?.value;
  const pk = cookieStore.get(constants.cookies.pk)?.value;

  if (!authToken || !pk) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/routes/user_main_page/${pk}/`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      }
    );

    if (response.status === 401) {
      return NextResponse.json(
        { error: "Your session expired. Please sign in again." },
        { status: 401 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to load dashboard. Please try again later." },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Store profile picture in a non-httpOnly cookie so it can be accessed client-side
    const profilePicture = data?.personal_info?.profile_picture?.[0];
    if (profilePicture && profilePicture !== "#") {
      const fullUrl = profilePicture.startsWith("http")
        ? profilePicture
        : `${
            process.env.NEXT_PUBLIC_ASSET_BASE_URL ||
            "https://www.hiking-buddies.com"
          }${profilePicture.startsWith("/") ? "" : "/"}${profilePicture}`;

      cookieStore.set(constants.cookies.profilePicture, fullUrl, {
        httpOnly: false, // Allow client-side access for avatar display
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard. Please try again later." },
      { status: 500 }
    );
  }
}
