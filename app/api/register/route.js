import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "users.json");

// تحميل المستخدمين
function getUsers() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// حفظ المستخدمين
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    );
  }

  const users = getUsers();

  const exists = users.find(u => u.email === email);
  if (exists) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  users.push({ email, password });
  saveUsers(users);

  return NextResponse.json({ message: "User created" });
}
