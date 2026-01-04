import constants from "@/services/user-service/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_BASE_URL || "https://www.hiking-buddies.com";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(constants.cookies.authToken)?.value;

  if (!authToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/routes/news_feed/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    });

    if (response.status === 401) {
      return NextResponse.json(
        { error: "Your session expired. Please sign in again." },
        { status: 401 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to load news feed. Please try again later." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("News feed fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load news feed. Please try again later." },
      { status: 500 }
    );
  }
}
