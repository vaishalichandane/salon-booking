import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        // ✅ Save real token
        localStorage.setItem("token", data.token);

        // optional role (user/admin)
        localStorage.setItem("role", data.role);

        alert("Login successful");

        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.45)",
        }}
      ></div>

      {/* LOGIN BOX */}
      <div
        style={{
          position: "relative",
          width: "380px",
          padding: "35px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#222" }}>
          Welcome to Glow Salon
        </h2>

        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
          Login to book your beauty services
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button style={btnStyle}>Login</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New user?{" "}
          <Link to="/signup" style={{ color: "#e91e63" }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

/* STYLES */
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#e91e63",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  marginTop: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Login;