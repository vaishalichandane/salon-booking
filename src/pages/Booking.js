import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

function Booking() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();   // ✅ get data from previous page
  const navigate = useNavigate();

  const { form, handleChange, setForm } = useForm({
    name: "",
    mobile: "",
    service: "",
    date: ""
  });

  const nameRef = useRef();

  // ✅ Focus input
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // ✅ Protect page (LOGIN REQUIRED)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Auto-fill service from ServiceDetails
  useEffect(() => {
    if (location.state) {
      setForm((prev) => ({
        ...prev,
        service: location.state.selectedService
      }));
    }
  }, [location, setForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.service || !form.date) {
      setMessage("❌ Please fill all fields");
      return;
    }

    if (form.mobile.length !== 10) {
      setMessage("❌ Mobile must be 10 digits");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Booking Successful!");
    }, 1500);
  };

  return (
    <div className="booking-page">

      {/* NAVBAR */}
      <nav className="navbar navbar-inverse custom-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Glow Salon</Link>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div className="booking-overlay">

        {/* FORM CARD */}
        <div className="booking-form-container">

          <h2>Book an Appointment</h2>
          <p>Fill the form below</p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Select Service</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Service</option>
                <option>Hair Styling</option>
                <option>Facial & Skin Care</option>
                <option>Makeup</option>
                <option>Nail Art</option>
              </select>
            </div>

            <div className="form-group">
              <label>Appointment Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button
              className="btn btn-warning btn-block"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

          </form>

          {/* MESSAGE */}
          <p className="booking-message">{message}</p>

        </div>
      </div>
    </div>
  );
}

export default Booking;