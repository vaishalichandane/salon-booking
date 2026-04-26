import { useLocation } from "react-router-dom";

function Failed() {
  const { state } = useLocation();

  return (
    <div style={container}>
      <div style={card}>
        <h1>❌ Payment Failed</h1>
        <p>Please try again</p>

        {/* optional invoice (if booking created before failure) */}
        {state && (
          <p>You can still check details in booking history</p>
        )}
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  padding: "30px",
  background: "#fff3e0",
  borderRadius: "10px",
  textAlign: "center",
};

export default Failed;