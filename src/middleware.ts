import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const privatePaths = ["/perfil", "/dashboard", "/app"];

  if (privatePaths.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get("session")?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil/:path*", "/dashboard/:path*", "/app/:path*"],
};
