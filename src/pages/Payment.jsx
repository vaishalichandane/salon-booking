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

        handler: async function () {
          alert("Payment Successful ✅");

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
              }),
            }
          );

          const data = await res.json();
          navigate("/invoice", { state: data });
        },

        theme: { color: "#e91e63" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed ❌");
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>

      <p>Service: {service}</p>
      <p>Price: ₹{price}</p>
      <p>Time: {time}</p>

      <button onClick={() => setMethod("UPI")}>UPI</button>
      <button onClick={() => setMethod("Card")}>Card</button>
      <button onClick={() => setMethod("Cash")}>Cash</button>

      <br /><br />

      <button onClick={handlePayment}>
        Confirm Payment
      </button>
    </div>
  );
}

export default Payment;