import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // إذا المستخدم عم يحاول يدخل عالداشبورد
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // إذا ما في توكن → رجعو لصفحة تسجيل الدخول
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// تحديد الصفحات اللي بدنا نحميها
export const config = {
  matcher: ["/dashboard"],
};
