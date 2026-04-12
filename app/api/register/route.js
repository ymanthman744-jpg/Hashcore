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
    const { name, email, password } = body;

    // تحقق بسيط
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" });
    }

    // ادخال المستخدم
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json({
      error: "Database error",
    });
  }
}
