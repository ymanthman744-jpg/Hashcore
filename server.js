const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let db = { users: [] };

if (fs.existsSync("db.json")) {
  db = JSON.parse(fs.readFileSync("db.json"));
}

function saveDB() {
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
}

// تسجيل
app.post("/register", (req, res) => {
  const { username, password, ref } = req.body;

  if (!username || !password) {
    return res.json({ success: false });
  }

  if (db.users.find(u => u.username === username)) {
    return res.json({ success: false });
  }

  db.users.push({
    username,
    password,
    balance: 0,
    ref: ref || null,
    lastProfit: Date.now()
  });

  saveDB();
  res.json({ success: true });
});

// تسجيل دخول
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.json({ success: false });
  }

  res.json({ success: true });
});

// جلب المستخدم + الدعوات
app.post("/get-user", (req, res) => {
  const { username } = req.body;

  let user = db.users.find(u => u.username === username);

  if (!user) {
    return res.json({ success: false });
  }

  let refs = db.users.filter(u => u.ref === username);

  res.json({
    success: true,
    user,
    referralsCount: refs.length,
    totalBonus: refs.length * 1
  });
});

// استثمار
app.post("/invest", (req, res) => {
  const { username, amount } = req.body;

  let user = db.users.find(u => u.username === username);

  if (!user || user.balance < amount) {
    return res.json({ success: false });
  }

  user.balance -= amount;

  if (user.ref) {
    let refUser = db.users.find(u => u.username === user.ref);
    if (refUser) refUser.balance += amount * 0.1;
  }

  saveDB();

  res.json({ success: true });
});

// أرباح كل 24 ساعة
setInterval(() => {
  let now = Date.now();

  db.users.forEach(user => {
    if (now - user.lastProfit >= 86400000) {
      user.balance += user.balance * 0.05;
      user.lastProfit = now;
    }
  });

  saveDB();

}, 60000);
// شحن رصيد
app.post("/deposit", (req, res) => {
  const { username, amount } = req.body;

  let user = db.users.find(u => u.username === username);

  if (!user) {
    return res.json({ success: false });
  }

  user.balance += Number(amount);

  saveDB();

  res.json({ success: true, balance: user.balance });
});

// تشغيل
app.listen(4000, () => {
  console.log("Server running http://localhost:4000");
});
