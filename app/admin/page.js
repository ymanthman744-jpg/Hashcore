export default function Home() {
  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "white", direction: "rtl", fontFamily: "Arial" }}>
      
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #ff512f, #dd2476)",
        padding: "15px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "20px"
      }}>
        🔥 HashCore
      </div>

      {/* Balance */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div style={{
          background: "#111827",
          padding: "15px",
          borderRadius: "10px",
          display: "inline-block"
        }}>
          💰 0 USDT
        </div>
      </div>

      {/* Image Cards */}
      <div style={{ padding: "10px" }}>
        <img src="https://via.placeholder.com/300x150" style={imgStyle} />
        <img src="https://via.placeholder.com/300x150" style={imgStyle} />
      </div>

      {/* Plan */}
      <div style={{ padding: "15px" }}>
        <h3>🔥 باقة البداية</h3>
        <p>10 USDT - 2%</p>
        <button style={btnStyle}>شراء</button>
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#111",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px"
      }}>
        <span>🏠</span>
        <span>📊</span>
        <span>💰</span>
        <span>👤</span>
      </div>

    </div>
  );
}

const imgStyle = {
  width: "100%",
  borderRadius: "10px",
  marginBottom: "10px"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "linear-gradient(90deg, #ff512f, #dd2476)",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold"
};
