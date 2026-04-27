import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

function Booking() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { form, handleChange, setForm } = useForm({
    name: "",
    mobile: "",
    service: "",
    date: "",
  });

  const nameRef = useRef();

  // auto focus
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // login protection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  // auto-fill service from service page
  useEffect(() => {
    if (location.state?.selectedService) {
      setForm((prev) => ({
        ...prev,
        service: location.state.selectedService,
      }));
    }
  }, [location, setForm]);

  // 🚀 FINAL BOOKING LOGIC (CONNECTED TO BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.mobile || !form.service || !form.date) {
      setMessage("❌ Please fill all fields");
      return;
    }

    if (form.mobile.length !== 10) {
      setMessage("❌ Mobile must be 10 digits");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://salon-booking-1r2e.onrender.com/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@gmail.com",
            name: form.name,
            mobile: form.mobile,
            service: form.service,
            date: form.date,
            paymentMethod: "Pending",
            paymentStatus: "Pending",
          }),
        }
      );

      const data = await res.json();

      setMessage("✅ Booking Successful!");

      // 👉 move to payment page with data
      navigate("/payment", { state: data });

    } catch (error) {
      console.log(error);
      setMessage("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="booking-page">

      {/* NAVBAR */}
      <nav className="navbar navbar-inverse custom-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Glow Salon
            </Link>
          </div>
        </div>
      </nav>

      {/* FORM */}
      <div className="booking-overlay">
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

            <button className="btn btn-warning btn-block" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

          </form>

          {/* MESSAGE */}
          <p style={{ marginTop: "10px", color: "green" }}>
            {message}
          </p>

        </div>
      </div>
    </div>
  );
}

export default Booking;