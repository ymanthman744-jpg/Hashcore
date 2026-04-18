import { NextResponse } from "next/server";

let users = []; // مؤقت (رح نبدلو بقاعدة بيانات)

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = users.find((u) => u.email === email);

  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  users.push({ email, password });

  return NextResponse.json({ success: true });
}
