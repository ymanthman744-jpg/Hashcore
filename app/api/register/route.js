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
    // إنشاء جدول users إذا ما موجود
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    const body = await req.json();
    const { name, email, password } = body;
    // ✅ التصحيح هون
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, password]
    );

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });

  catch (err) {
  console.error("🔥 DB ERROR:", err);
  return NextResponse.json({ error: err.message });
  }
