import * as cookie from "worktop/cookie";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { COOKIE_NAME } from "./constants";
import type { EnvSchema } from "./schema";

export const isAuthenticated = async (request: Request, env: EnvSchema) => {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies[COOKIE_NAME];
  if (!token) {
    return false;
  }
  return await jwt.verify(token, env.SECRET);
};

export const getAuthCookieHeaders = async (env: EnvSchema) => {
  const payload = await jwt.sign({ iat: Date.now() }, env.SECRET);
  const headers = new Headers();
  const cookieStr = cookie.stringify(COOKIE_NAME, payload, {
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
  });

  headers.set("Set-Cookie", cookieStr);
  return headers;
};
