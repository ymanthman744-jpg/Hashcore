import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    await pool.query(
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    );

    return NextResponse.json({ message: "Table created" });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Setup failed" },
      { status: 500 }
    );
  }
}
