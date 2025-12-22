import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // Clear all auth cookies
  cookieStore.delete("authToken");
  cookieStore.delete("pk");
  cookieStore.delete("username");
  cookieStore.delete("profilePicture");

  return NextResponse.json({ success: true });
}

