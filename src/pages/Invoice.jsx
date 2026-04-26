import { useLocation, useNavigate } from "react-router-dom";

function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const service = state?.service;
  const price = state?.price;
  const time = state?.time;
  const method = state?.paymentMethod;

  const handleDownload = () => {
    window.print(); // ✅ opens print → save as PDF
  };

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Invoice Data ❌</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card} id="invoice">
        <h2 style={{ color: "#e91e63", textAlign: "center" }}>
          Salon Invoice
        </h2>

        <div style={box}>
          <p><b>Service:</b> {service || "Basic Service"}</p>
          <p><b>Time:</b> {time || "11:00 AM"}</p>
          <p><b>Payment Method:</b> {method || "UPI"}</p>
          <p><b>Amount Paid:</b> ₹{price || 1000}</p>
        </div>

        <button onClick={handleDownload} style={downloadBtn}>
          Download Invoice
        </button>

        <button onClick={() => navigate("/")} style={btn}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const container = {
  minHeight: "100vh",
  background: "#f4f6f8",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "400px",
  background: "#fff",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const box = {
  background: "#f9f9f9",
  padding: "15px",
  borderRadius: "8px",
  marginTop: "15px",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  cursor: "pointer",
};

const downloadBtn = {
  width: "100%",
  padding: "12px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  marginTop: "20px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Invoice;