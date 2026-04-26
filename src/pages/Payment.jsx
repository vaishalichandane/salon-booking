import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const service = state?.service;
  const price = state?.price;
  const time = state?.time;

  const [method, setMethod] = useState("");

  const handlePayment = async () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    console.log({
      email: "test@gmail.com",
      service,
      price,
      time,
      paymentMethod: method,
    });

    try {
      // ✅ CORRECT API
      const res = await fetch("https://salon-booking-1r2e.onrender.com/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@gmail.com",
          service,
          price,
          time,
          paymentMethod: method,
        }),
      });

      const data = await res.json();

      alert("Payment Successful ✅");

      // ✅ send backend data
      navigate("/invoice", {
        state: data,
      });

    } catch (error) {
      console.error(error);
      alert("Error saving booking ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center", color: "#e91e63" }}>
          Payment
        </h2>

        <div style={detailsBox}>
          <p><b>Service:</b> {service}</p>
          <p><b>Time:</b> {time}</p>
          <p><b>Amount:</b> ₹{price}</p>
        </div>

        <h4>Select Payment Method</h4>

        <div style={methodContainer}>
          <button
            style={{
              ...methodBtn,
              background: method === "UPI" ? "#ffe4ec" : "#fff",
            }}
            onClick={() => setMethod("UPI")}
          >
            UPI
          </button>

          <button
            style={{
              ...methodBtn,
              background: method === "Card" ? "#ffe4ec" : "#fff",
            }}
            onClick={() => setMethod("Card")}
          >
            Card
          </button>

          <button
            style={{
              ...methodBtn,
              background: method === "Cash" ? "#ffe4ec" : "#fff",
            }}
            onClick={() => setMethod("Cash")}
          >
            Cash
          </button>
        </div>

        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          {method && `Selected: ${method}`}
        </p>

        <button onClick={handlePayment} style={mainBtn}>
          Confirm Payment
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

const detailsBox = {
  background: "#f9f9f9",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
};

const methodContainer = {
  display: "flex",
  gap: "10px",
};

const methodBtn = {
  flex: 1,
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  cursor: "pointer",
};

const mainBtn = {
  width: "100%",
  padding: "12px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px",
  fontWeight: "bold",
};

export default Payment;