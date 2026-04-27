import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  // 🔐 ADMIN CHECK
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminToken") === "true";

    if (!isAdmin) {
      alert("Access Denied");
      navigate("/");
    }
  }, [navigate]);

  // 📦 FETCH DATA
  useEffect(() => {
    fetch("https://salon-booking-1r2e.onrender.com/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 FILTER + SEARCH LOGIC
  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.service?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || b.paymentMethod === filter;

    return matchSearch && matchFilter;
  });

  // 📊 CALCULATIONS
  const total = bookings.length;

  const revenue = bookings.reduce(
    (acc, b) => acc + (b.price || 0),
    0
  );

  const cash = bookings.filter(
    (b) => b.paymentMethod === "Cash"
  ).length;

  const online = bookings.filter(
    (b) => b.paymentMethod !== "Cash"
  ).length;

  const pieData = [
    { name: "Online", value: online },
    { name: "Cash", value: cash },
  ];

  const barData = [
    { name: "Bookings", value: total },
    { name: "Revenue", value: revenue },
  ];

  const COLORS = ["#e91e63", "#9c27b0"];

  return (
    <div style={container}>
      <h1>📊 Admin Dashboard</h1>

      {/* CARDS */}
      <div style={cardRow}>
        <div style={card}>
          <h3>Total Bookings</h3>
          <h2>{total}</h2>
        </div>

        <div style={card}>
          <h3>Total Revenue</h3>
          <h2>₹{revenue}</h2>
        </div>

        <div style={card}>
          <h3>Cash Bookings</h3>
          <h2>{cash}</h2>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div style={searchBox}>
        <input
          type="text"
          placeholder="Search email or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={input}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={select}
        >
          <option value="All">All</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
      </div>

      {/* CHARTS */}
      <div style={chartRow}>
        <div>
          <h3>Payment Method</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h3>Overview</h3>
          <BarChart width={300} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#e91e63" />
          </BarChart>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredBookings.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No bookings found 😕
        </p>
      )}

      {/* TABLE */}
      <h2>All Bookings</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Service</th>
            <th>Price</th>
            <th>Time</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((b, i) => (
            <tr key={i}>
              <td>{b.email}</td>
              <td>{b.service}</td>
              <td>₹{b.price}</td>
              <td>{b.time}</td>
              <td>{b.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  padding: "30px",
  fontFamily: "Arial",
  background: "#f5f5f5",
};

const cardRow = {
  display: "flex",
  gap: "20px",
};

const card = {
  flex: 1,
  background: "#e91e63",
  color: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
};

const searchBox = {
  display: "flex",
  gap: "10px",
  margin: "20px 0",
};

const input = {
  padding: "10px",
  width: "60%",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const select = {
  padding: "10px",
  borderRadius: "8px",
};

const chartRow = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "30px",
};

const table = {
  width: "100%",
  marginTop: "20px",
  background: "white",
  borderCollapse: "collapse",
};

export default Admin;