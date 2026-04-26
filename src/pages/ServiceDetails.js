import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import services from "../data/services";

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = services.find((s) => s.id === parseInt(id));

  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");

  if (!service) return <h2>Service Not Found</h2>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f6f8",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>

      <div style={{
        width: "420px",
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          {service.title}
        </h2>

        <img
          src={service.img}
          alt=""
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />

        <p style={{ color: "#666", marginTop: "10px" }}>
          {service.desc}
        </p>

        {/* SERVICE OPTIONS */}
        <h4 style={{ marginTop: "15px" }}>Select Service</h4>

        <div
          style={{
            ...optionStyle,
            background: selectedService === "Basic" ? "#ffe4ec" : "#fff"
          }}
          onClick={() => {
            setSelectedService("Basic");
            setPrice(500);
          }}
        >
          <span>Basic</span>
          <span>₹500</span>
        </div>

        <div
          style={{
            ...optionStyle,
            background: selectedService === "Premium" ? "#ffe4ec" : "#fff"
          }}
          onClick={() => {
            setSelectedService("Premium");
            setPrice(1000);
          }}
        >
          <span>Premium</span>
          <span>₹1000</span>
        </div>

        {/* TIME */}
        <h4 style={{ marginTop: "15px" }}>Select Time</h4>

        <select
          style={inputStyle}
          onChange={(e) => setTime(e.target.value)}
        >
          <option>Select Time</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>2:00 PM</option>
          <option>4:00 PM</option>
        </select>

        {/* SELECTED INFO */}
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          {selectedService && `Selected: ${selectedService} - ₹${price}`}
        </p>

        {/* BUTTON */}
        <button
          onClick={() =>
            navigate("/payment", {
              state: { service: selectedService, price, time },
            })
          }
          style={btnStyle}
        >
          Proceed to Pay ₹{price || 0}
        </button>
      </div>
    </div>
  );
}

const optionStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginTop: "8px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  marginTop: "15px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ServiceDetail;