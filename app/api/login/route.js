import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "المستخدم غير موجود" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "كلمة المرور غلط" });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("userId", user.id, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "خطأ بالسيرفر" });
  }
}
