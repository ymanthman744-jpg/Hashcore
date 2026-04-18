import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return NextResponse.json({ error: "المستخدم موجود مسبقاً" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "خطأ بالسيرفر" });
  }
}
