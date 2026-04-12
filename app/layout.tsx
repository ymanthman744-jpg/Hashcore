export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <nav style={{
          background: "#111",
          color: "#fff",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span>🚀 Hashcore</span>
          <div>
            <a href="/" style={{ color: "#fff", margin: "10px" }}>Home</a>
            <a href="/login" style={{ color: "#fff", margin: "10px" }}>Login</a>
            <a href="/register" style={{ color: "#fff", margin: "10px" }}>Register</a>
          </div>
        </nav>

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
