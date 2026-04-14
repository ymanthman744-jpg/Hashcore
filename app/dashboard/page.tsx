"use client";

export default function Dashboard() {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 أهلاً بك في الداشبورد</h1>
      <p>أنت مسجل دخول</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
}
