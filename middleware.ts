import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import AppMiddleware from "@/lib/middleware/app";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/ (special pages for OG tags proxying and password protection)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const path = req.nextUrl.pathname;

  if (path !== "/" && path !== "/alternatives/docsend") {
    return AppMiddleware(req);
  }

  return NextResponse.next();
}
