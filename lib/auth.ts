import { cookies } from "next/headers";

export interface AuthState {
  isLoggedIn: boolean;
  pk: string | null;
  username: string | null;
  profilePicture: string | null;
}

export async function getAuthState(): Promise<AuthState> {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("authToken")?.value;
  const pk = cookieStore.get("pk")?.value ?? null;
  const username = cookieStore.get("username")?.value ?? null;
  const profilePicture = cookieStore.get("profilePicture")?.value ?? null;

  return {
    isLoggedIn: Boolean(authToken && pk),
    pk,
    username,
    profilePicture,
  };
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value ?? null;
}

export async function getPk(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("pk")?.value ?? null;
}

