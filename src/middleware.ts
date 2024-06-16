import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export const config = {
  matcher: [
    "/api/test", 
    "/api/user/logout",
    "/api/user/get",
    "/api/gallery/:path*",
    "/api/media/:path*",
    "/",
    "/dashboard/:path*"
  ],
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((error) => {
    console.error(error.message);
  });
  console.log(verifiedToken);

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  console.log(verifiedToken._id);

  const response = NextResponse.next();
  response.headers.set("X-username", verifiedToken.username as string);
  response.headers.set("X-userId", verifiedToken._id as string);
  return response;
}
