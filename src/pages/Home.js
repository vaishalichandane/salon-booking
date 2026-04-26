import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import services from "../data/services";

function Home() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleBookingClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/booking");
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>

      {/* NAVBAR */}
      <nav className="navbar navbar-inverse custom-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Glow Salon</Link>
          </div>

          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/">Home</Link></li>
            <li><a href="#services">Services</a></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* ✅ NEW BUTTON ADDED */}
            <li><Link to="/history">My Bookings</Link></li>

            <li style={{ marginTop: "8px" }}>
              <button
                className="btn btn-warning btn-sm"
                onClick={handleBookingClick}
              >
                Book Now
              </button>
            </li>

            {!isLoggedIn ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="btn btn-link"
                  style={{ color: "white" }}
                >
                  Logout
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn btn-link"
                style={{ color: "white" }}
              >
                🌙
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-section text-center">
        <h1>Glow Salon & Beauty Studio</h1>
        <p>Luxury beauty services with expert care</p>

        <button
          className="btn btn-warning btn-lg"
          onClick={handleBookingClick}
        >
          Book Appointment
        </button>
      </div>

      {/* SERVICES */}
      <div className="container text-center" id="services">
        <h2 className="section-title">Our Beauty Services</h2>

        <div className="row">
          {services.map((s) => (
            <div className="col-sm-3" key={s.id}>
              <Link
                to={`/service/${s.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="service-card">
                  <img src={s.img} alt={s.title} />
                  <div className="service-content">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div style={{ padding: "80px 20px", background: "#f5f7fa" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            background: "#ffffff",
            padding: "50px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "34px", fontWeight: "bold" }}>
            About Glow Salon
          </h2>

          <p style={{ color: "#555", lineHeight: "1.8" }}>
            At <strong>Glow Salon & Beauty Studio</strong>, we create beauty
            experiences that enhance confidence and personal style.
            <br /><br />
            From hair styling to skincare and makeup, our experts deliver
            personalized services tailored to every client.
            <br /><br />
            We focus on quality, comfort, and premium care.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#fff", padding: "40px" }}>
        <div style={{ textAlign: "center" }}>
          © 2026 Glow Salon | All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default Home;