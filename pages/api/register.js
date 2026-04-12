import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { username, email, password } = req.body;

    // تحقق بسيط
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );

    res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
