import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session_id";

export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (existing) {
    return existing;
  }

  const newId = crypto.randomUUID();

  cookieStore.set(SESSION_COOKIE_NAME, newId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
  });

  return newId;
}
