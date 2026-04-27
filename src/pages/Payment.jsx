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
      // 💵 CASH
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

        navigate("/success", { state: data });
        return;
      }

      // 💳 ONLINE
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
          navigate("/success", { state: data });
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            navigate("/failed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      navigate("/failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Payment</h2>

      <p>Service: {service}</p>
      <p>Price: ₹{price}</p>

      <div>
        <button onClick={() => setMethod("UPI")}>UPI</button>
        <button onClick={() => setMethod("Card")}>Card</button>
        <button onClick={() => setMethod("Cash")}>Cash</button>
      </div>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${price}`}
      </button>
    </div>
  );
}

export default Payment;