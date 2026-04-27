import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("");

  const service = state?.service;
  const price = state?.price;
  const time = state?.time;

  const handlePayment = async () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    setLoading(true);

    try {
      // CASH
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
              paymentStatus: "Success",
            }),
          }
        );

        const data = await res.json();

        setLoading(false);
        navigate("/success", { state: data });
        return;
      }

      // ONLINE PAYMENT
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
        order_id: orderData.id,
        name: "Glow Salon",

        handler: async function () {
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
                paymentStatus: "Success",
              }),
            }
          );

          const data = await res.json();

          setLoading(false);
          navigate("/success", { state: data });
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            navigate("/failed");
          },
        },

        theme: {
          color: "#e91e63",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      setLoading(false);
      navigate("/failed");
    }
  };

  return (
    <div style={page}>
      <div style={card}>

        <div style={header}>
          <h2>💳 Secure Checkout</h2>
          <p>Complete your salon booking payment</p>
        </div>

        <div style={infoBox}>
          <p><b>Service:</b> {service}</p>
          <p><b>Price:</b> ₹{price}</p>
          <p><b>Time:</b> {time}</p>
        </div>

        <h4 style={{ marginTop: "20px" }}>Select Payment Method</h4>

        <div style={methods}>
          <div style={method === "UPI" ? active : box} onClick={() => setMethod("UPI")}>📱 UPI</div>
          <div style={method === "Card" ? active : box} onClick={() => setMethod("Card")}>💳 Card</div>
          <div style={method === "Cash" ? active : box} onClick={() => setMethod("Cash")}>💵 Cash</div>
        </div>

        <button onClick={handlePayment} style={btn} disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${price}`}
        </button>

        <p style={note}>🔒 Secure Payment Powered by Razorpay</p>

      </div>
    </div>
  );
}

export default Payment;
const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f8bbd0, #ede7f6)",
};

const card = {
  width: "420px",
  background: "#fff",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  textAlign: "center",
};

const header = { marginBottom: "10px" };

const infoBox = {
  background: "#f7f7f7",
  padding: "12px",
  borderRadius: "10px",
  textAlign: "left",
};

const methods = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const box = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  cursor: "pointer",
  background: "#fff",
};

const active = {
  ...box,
  background: "#ffe0eb",
  border: "1px solid #e91e63",
};

const btn = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  background: "linear-gradient(90deg, #e91e63, #ff4081)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
};

const note = {
  fontSize: "12px",
  marginTop: "10px",
  color: "#777",
};