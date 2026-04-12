import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function POST(req) {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  const body = await req.json();
  const email = body.email;
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // انتبه هون 👇 backticks مهمين
  await db.exec(
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  );

  try {
    await db.run(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );

    return NextResponse.json({ message: "User created" });

  } catch (e) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }
}
