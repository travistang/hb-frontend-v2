import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;
  const pk = cookieStore.get("pk")?.value;
  const username = cookieStore.get("username")?.value;

  if (!authToken || !pk) {
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    pk,
    username,
  });
}

