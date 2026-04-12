import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password } = body;

  console.log("New user:", name, email);

  return NextResponse.json({
    success: true,
    message: "User registered (test only)"
  });
}
