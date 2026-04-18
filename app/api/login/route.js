import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

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

    // ✅ مقارنة كلمة المرور المشفرة
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "كلمة المرور غلط" });
    }

    // ✅ إنشاء response
    const response = NextResponse.json({ success: true });

    // ✅ حفظ userId داخل cookie
    response.cookies.set("userId", user.id, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "خطأ بالسيرفر" });
  }
}
