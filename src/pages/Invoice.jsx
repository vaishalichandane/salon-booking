import { useLocation, useNavigate } from "react-router-dom";

function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <h2>No Invoice Found</h2>;
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2>Invoice</h2>

        <p>Service: {state.service}</p>
        <p>Price: ₹{state.price}</p>
        <p>Time: {state.time}</p>
        <p>Payment: {state.paymentMethod}</p>

        <button onClick={() => window.print()} style={btn}>
          Download Invoice
        </button>

        <button onClick={() => navigate("/")} style={btn2}>
          Home
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f5f5",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "green",
  color: "white",
  border: "none",
  marginTop: "10px",
};

const btn2 = {
  width: "100%",
  padding: "10px",
  background: "#e91e63",
  color: "white",
  border: "none",
  marginTop: "10px",
};

export default Invoice;