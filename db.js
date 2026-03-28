const initSqlJs = require('sql.js');
const fs = require('fs');

let db;

async function getDB() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync('database.db')) {
    const filebuffer = fs.readFileSync('database.db');
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
  }

  return db;
}

function saveDB() {
  const data = db.export();
  fs.writeFileSync('database.db', Buffer.from(data));
}

module.exports = { getDB, saveDB };
