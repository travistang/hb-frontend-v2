import userService from "@/services/user-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    try {
      await userService.login(body.username, body.password);
    } catch (error) {
      return NextResponse.json(
        {
          error: "Wrong credentials. Please check your username and password.",
        },
        { status: 401 }
      );
    }

    const me = await userService.getMe();
    if (!me) {
      return NextResponse.json(
        { error: "An error occurred. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(me);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
