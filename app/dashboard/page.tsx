import { cookies } from "next/headers";

export default function Dashboard() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  if (!userId) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        ❌ لازم تسجل دخول أول
      </h2>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 أهلاً بك في الداشبورد</h1>
      <p>أنت مسجل دخول</p>
    </div>
  );
}
