export default function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>تسجيل الدخول</h2>
      <input placeholder="Email" style={{ width: "100%", margin: "10px 0" }} />
      <input placeholder="Password" type="password" style={{ width: "100%", margin: "10px 0" }} />
      <button style={{ width: "100%" }}>Login</button>
    </div>
  );
}
