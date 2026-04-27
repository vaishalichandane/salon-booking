import { useLocation, useNavigate } from "react-router-dom";

function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Invoice Found ❌</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const service = state?.service;
  const price = state?.price;
  const time = state?.time;
  const method = state?.paymentMethod;

  // ⭐ PREMIUM ADDITIONS
  const invoiceId = "INV" + Math.floor(Math.random() * 100000);
  const date = new Date().toLocaleString();

  const handleDownload = () => {
    window.print();
  };

  return (
    <div style={container}>
      <div style={card}>

        {/* HEADER */}
        <h2 style={title}>💖 Glow Salon Invoice</h2>
        <p style={subtitle}>Thank you for your booking!</p>

        {/* INVOICE DETAILS */}
        <div style={box}>
          <p><b>Invoice ID:</b> {invoiceId}</p>
          <p><b>Date:</b> {date}</p>
          <p><b>Service:</b> {service}</p>
          <p><b>Time:</b> {time}</p>
          <p><b>Payment Method:</b> {method}</p>
          <p><b>Total Amount:</b> ₹{price}</p>
        </div>

        {/* BUTTONS */}
        <button onClick={handleDownload} style={downloadBtn}>
          Download Invoice (PDF)
        </button>

        <button onClick={() => navigate("/")} style={btn}>
          Back to Home
        </button>

      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f8bbd0, #ede7f6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "420px",
  background: "#fff",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
};

const title = {
  textAlign: "center",
  color: "#e91e63",
};

const subtitle = {
  textAlign: "center",
  color: "#777",
  marginBottom: "15px",
};

const box = {
  background: "#f7f7f7",
  padding: "15px",
  borderRadius: "10px",
  lineHeight: "1.8",
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const downloadBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Invoice;