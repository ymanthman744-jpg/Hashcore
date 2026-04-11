import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  // fake login
  if (email === "test@test.com" && password === "1234") {
    return NextResponse.json({
      success: true,
      user: { email }
    });
  }

  return NextResponse.json({
    error: "Invalid credentials"
  });
}
