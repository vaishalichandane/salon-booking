import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 SIMPLE ADMIN CHECK (you can upgrade later with backend JWT)
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("adminToken", "true");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>🔐 Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button style={btn}>Login</button>
        </form>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3e5f5",
};

const card = {
  padding: "30px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const input = {
  display: "block",
  width: "250px",
  margin: "10px 0",
  padding: "10px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#e91e63",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default AdminLogin;