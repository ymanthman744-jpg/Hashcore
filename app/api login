import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const db = new sqlite3.Database("database.db");

  return new Promise((resolve) => {
    db.get(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, row) => {
        if (err) {
          resolve(NextResponse.json({ error: "Server error" }));
        } else if (!row) {
          resolve(NextResponse.json({ error: "Invalid credentials" }));
        } else {
          resolve(
            NextResponse.json({
              success: true,
              user: row,
            })
          );
        }
      }
    );
  });
}
