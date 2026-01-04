import userService from "@/services/user-service";
import { NextResponse } from "next/server";

export async function GET() {
  const me = await userService.getMe();
  return NextResponse.json(me);
}
