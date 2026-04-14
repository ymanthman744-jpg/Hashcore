import { NextResponse } from "next/server";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" });
    }

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" });
  }
}
