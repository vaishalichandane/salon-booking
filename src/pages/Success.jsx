import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

function Success() {
  const { state } = useLocation();
 
  const navigate = useNavigate();
 const data = state || {};
  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Glow Salon Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Email: ${state?.email}`, 20, 40);
    doc.text(`Service: ${state?.service}`, 20, 50);
    doc.text(`Price: ₹${state?.price}`, 20, 60);
    doc.text(`Time: ${state?.time}`, 20, 70);
    doc.text(`Payment: ${state?.paymentMethod}`, 20, 80);

    doc.save("invoice.pdf");
  };

  return (
    <div style={container}>
      <motion.div
        style={card}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ANIMATION ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ yoyo: Infinity }}
          style={{ fontSize: "60px" }}
        >
          🎉
        </motion.div>

        <h1>Booking Confirmed</h1>
        <p>Thank you for choosing Glow Salon</p>

        <div style={box}>
          <p><b>Service:</b> {state?.service}</p>
          <p><b>Price:</b> ₹{state?.price}</p>
          <p><b>Time:</b> {state?.time}</p>
          <p><b>Payment:</b> {state?.paymentMethod}</p>
        </div>

        <button onClick={downloadInvoice} style={btn}>
          📄 Download Invoice
        </button>

        <button onClick={() => navigate("/")} style={btn2}>
          Go Home
        </button>
      </motion.div>
    </div>
  );
}

/* styles */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #fce4ec, #f3e5f5)",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  width: "350px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const box = {
  background: "#f9f9f9",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
};

const btn = {
  marginTop: "15px",
  padding: "10px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  width: "100%",
  cursor: "pointer",
};

const btn2 = {
  marginTop: "10px",
  padding: "10px",
  background: "#333",
  color: "#fff",
  border: "none",
  width: "100%",
  cursor: "pointer",
};

export default Success;