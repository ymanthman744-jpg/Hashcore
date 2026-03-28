const { getDB, saveDB } = require('./db.js');
async function ensureTable(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      balance INTEGER
    );
  `);
}
async function addUser(name) {
  const db = await getDB();
  await ensureTable(db);

db.run(
  "INSERT INTO users (name, balance) VALUES (?, ?)",
  [name, 0]
);

saveDB();
  console.log("✅ تم إضافة المستخدم");
}

async function addBalance(name, amount) {
  const db = await getDB();
  await ensureTable(db);

  db.run(
    "UPDATE users SET balance = balance + ? WHERE name = ?",
    [amount, name]
  );
saveDB();
  console.log("💰 تم تعديل الرصيد");
}

async function showUsers() {
  const db = await getDB();
  await ensureTable(db);

  const res = db.exec("SELECT * FROM users");

  if (res.length === 0) {
    console.log("❌ لا يوجد مستخدمين");
    return;
  }

  const rows = res[0].values;

  console.log("📋 المستخدمين:");
  rows.forEach(r => {
    console.log(`ID: ${r[0]} | الاسم: ${r[1]} | الرصيد: ${r[2]}`);
  });
}

module.exports = { addUser, addBalance, showUsers };
