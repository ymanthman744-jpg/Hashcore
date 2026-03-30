export default function Home() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #00c6ff, #6a00ff)",
      direction: "rtl",
      fontFamily: "Arial"
    }}>

      <div style={{ width: "90%", maxWidth: "350px", textAlign: "center" }}>
        <h1 style={{ color: "white" }}>Hashcore</h1>

        <input placeholder="بريد إلكتروني" style={inputStyle} />
        <input placeholder="كلمة المرور" type="password" style={inputStyle} />

        <button style={btnStyle}>تسجيل الدخول</button>
      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "none"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#00ffd5",
  fontWeight: "bold"
};
