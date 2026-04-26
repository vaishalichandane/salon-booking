import { useEffect, useState } from "react";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div style={container}>
      <h2 style={title}>My Booking History</h2>

      {bookings.length === 0 ? (
        <p style={empty}>No bookings found</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} style={card}>
            <p><b>Service:</b> {b.service || "N/A"}</p>
            <p><b>Price:</b> ₹{b.price || 0}</p>
            <p><b>Time:</b> {b.time || "Not Selected"}</p>
            <p><b>Payment:</b> {b.paymentMethod || "N/A"}</p>
            <p><b>Status:</b> {b.paymentStatus}</p>
            <p>
              <b>Date:</b>{" "}
              {b.date ? new Date(b.date).toLocaleDateString() : "N/A"}
            </p>

            {/* DOWNLOAD INVOICE BUTTON */}
            <button
              onClick={() =>
                window.open(`http://localhost:5000/invoice/${b._id}`)
              }
              style={downloadBtn}
            >
              Download Invoice
            </button>
          </div>
        ))
      )}
    </div>
  );
}

/* STYLES */

const container = {
  minHeight: "100vh",
  padding: "30px",
  background: "#f4f6f8",
};

const title = {
  textAlign: "center",
  color: "#e91e63",
  marginBottom: "20px",
};

const empty = {
  textAlign: "center",
  fontSize: "18px",
};

const card = {
  background: "#fff",
  padding: "15px",
  margin: "10px auto",
  maxWidth: "400px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const downloadBtn = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default BookingHistory;