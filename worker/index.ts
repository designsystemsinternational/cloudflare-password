import { envSchema } from "./schema";
import { getAuthCookieHeaders, isAuthenticated } from "./util";

export default {
  async fetch(request, _env) {
    const envRes = envSchema.safeParse(_env);

    if (!envRes.success) {
      console.error(envRes.error.issues);
      return new Response(null, { status: 404 });
    }

    const env = envRes.data;
    const url = new URL(request.url);
    const authenticated = await isAuthenticated(request, env);

    /**
     * Authenticate endpoint
     */
    if (url.pathname.startsWith("/auth/authenticate")) {
      if (authenticated) {
        return Response.json({ success: true });
      }

      const formData = await request.formData();
      const password = formData.get("password") as string;

      if (password === env.PASSWORD) {
        const headers = await getAuthCookieHeaders(env);
        return Response.json(
          {
            success: true,
          },
          { headers }
        );
      }

      return Response.json(
        {
          success: false,
        },
        { status: 404 }
      );
    }

    /**
     * Always render auth pages without auth
     */
    if (url.pathname.startsWith("/auth")) {
      console.log("Auth page request:", request.url);
      return _env.ASSETS.fetch(request);
    }

    /**
     * All other requests
     */
    if (!authenticated) {
      const authUrl = new URL("/auth", request.url);
      const nextPath = url.pathname + url.search;
      authUrl.searchParams.set("next", nextPath);
      console.log("Redirecting to:", authUrl.toString());
      return Response.redirect(authUrl.toString(), 302);
    }

    return _env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
