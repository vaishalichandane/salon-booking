import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CONNECTED TO BACKEND
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://salon-booking-1r2e.onrender.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      {/* Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)"
      }}></div>

      {/* Form Box */}
      <div style={{
        position: "relative",
        width: "420px",
        padding: "30px",
        borderRadius: "15px",
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>

        <h2 style={{ textAlign: "center", color: "#333" }}>Create Account</h2>
        <p style={{ textAlign: "center", color: "#777" }}>Join Glow Salon</p>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button style={btnStyle}>Signup</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  cursor: "pointer"
};

export default Signup;