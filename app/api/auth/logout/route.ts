import userService from "@/services/user-service";
import { NextResponse } from "next/server";

export async function POST() {
  await userService.logout();
  return NextResponse.json({ success: true });
}
