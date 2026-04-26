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

    // 💵 CASH FLOW (UNCHANGED BUT FIXED STATUS ADDED)
    if (method === "Cash") {
      const res = await fetch(
        "https://salon-booking-1r2e.onrender.com/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@gmail.com",
            service,
            price,
            time,
            paymentMethod: "Cash",
            paymentStatus: "Cash", // ✅ ADDED
          }),
        }
      );

      const data = await res.json();

      alert("Booking Confirmed (Cash) ✅");
      navigate("/success", { state: data });

      return;
    }

    // 💳 UPI / CARD → RAZORPAY FLOW
    try {
      const orderRes = await fetch(
        "https://salon-booking-1r2e.onrender.com/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: price }),
        }
      );

      const orderData = await orderRes.json();

      const options = {
        key: "rzp_test_Si9opVDSfyrDMC",
        amount: orderData.amount,
        currency: "INR",
        name: "Glow Salon",
        description: "Salon Booking Payment",
        order_id: orderData.id,

        // ✅ SUCCESS HANDLER (UNCHANGED LOGIC)
        handler: async function (response) {
          const res = await fetch(
            "https://salon-booking-1r2e.onrender.com/book",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: "test@gmail.com",
                service,
                price,
                time,
                paymentMethod: method,
                paymentStatus: "Success", // ✅ ADDED
              }),
            }
          );

          const data = await res.json();

          navigate("/success", { state: data });
        },

        // ❗ PAYMENT FAILED HANDLING (ADDED SAFE)
        modal: {
          ondismiss: function () {
            navigate("/failed");
          },
        },

        // ❗ Razorpay failure event (ADDED SAFE)
        "payment.failed": function () {
          alert("Payment Failed ❌");
          navigate("/failed");
        },

        theme: {
          color: "#e91e63",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment failed ❌");
      navigate("/failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>💳 Secure Payment</h2>
        <p style={subTitle}>Complete your booking safely</p>

        <div style={box}>
          <p><b>Service:</b> {service}</p>
          <p><b>Price:</b> ₹{price}</p>
          <p><b>Time:</b> {time}</p>
        </div>

        <h4 style={{ marginTop: "20px" }}>Choose Payment Method</h4>

        <div style={methodGrid}>
          <div
            style={method === "UPI" ? activeCard : methodCard}
            onClick={() => setMethod("UPI")}
          >
            📱 UPI
          </div>

          <div
            style={method === "Card" ? activeCard : methodCard}
            onClick={() => setMethod("Card")}
          >
            💳 Card
          </div>

          <div
            style={method === "Cash" ? activeCard : methodCard}
            onClick={() => setMethod("Cash")}
          >
            💵 Cash
          </div>
        </div>

        <button onClick={handlePayment} style={payBtn}>
          Pay ₹{price}
        </button>
      </div>
    </div>
  );
}

/* ===== STYLES (UNCHANGED) ===== */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f8bbd0, #ede7f6)",
};

const card = {
  width: "380px",
  background: "#fff",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  textAlign: "center",
};

const title = {
  color: "#e91e63",
  fontSize: "22px",
  fontWeight: "bold",
};

const subTitle = {
  fontSize: "13px",
  color: "#777",
  marginBottom: "15px",
};

const box = {
  background: "#f7f7f7",
  padding: "12px",
  borderRadius: "10px",
  textAlign: "left",
};

const methodGrid = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const methodCard = {
  flex: 1,
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  cursor: "pointer",
  background: "#fff",
};

const activeCard = {
  ...methodCard,
  background: "#ffe0eb",
  border: "1px solid #e91e63",
  transform: "scale(1.05)",
};

const payBtn = {
  width: "100%",
  marginTop: "25px",
  padding: "12px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Payment;