"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("...جاري التسجيل");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ تم إنشاء الحساب");
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (err) {
      setMessage("❌ خطأ في الاتصال");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>إنشاء حساب</h2>

      <input
        type="email"
        placeholder="الإيميل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      />

      <br />

      <input
        type="password"
        placeholder="كلمة السر"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "10px" }}
      />

      <br />

      <button onClick={handleRegister} style={{ padding: "10px 20px" }}>
        تسجيل
      </button>

      <p>{message}</p>
    </div>
  );
}
