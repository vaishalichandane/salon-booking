import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.mobile || !form.message) {
      setMsg("Please fill all fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setMsg("Enter valid 10-digit number");
      return;
    }

    setMsg("Message sent successfully!");
    setForm({ name: "", email: "", mobile: "", message: "" });
  };

  return (
    <div>

      {/* 🔥 HERO SECTION */}
      <div
        style={{
          height: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* GRADIENT OVERLAY */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(233,30,99,0.5))",
          }}
        ></div>

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            color: "#fff",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
            Let’s Connect ✨
          </h1>

          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            Your beauty journey starts here. Reach out anytime.
          </p>
        </div>
      </div>

      {/* 🔥 FLOATING CONTACT CARD */}
      <div
        style={{
          marginTop: "-80px",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
          }}
        >
          <div>
            <h3>📞 Call Us</h3>
            <p>+91 9876543210</p>
          </div>

          <div>
            <h3>📧 Email</h3>
            <p>glowsalon@email.com</p>
          </div>

          <div>
            <h3>📍 Location</h3>
            <p>Nagpur, India</p>
          </div>
        </div>
      </div>

      {/* 🔥 FORM SECTION */}
      <div
        style={{
          padding: "80px 20px",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Send Message
          </h2>

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} style={inputStyle} />
            <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} style={inputStyle} />
            <input name="mobile" placeholder="Contact Number" value={form.mobile} onChange={handleChange} style={inputStyle} />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} style={inputStyle} />

            <button style={btnStyle}>Send Message</button>
          </form>

          {msg && (
            <p style={{ marginTop: "15px", color: "green", textAlign: "center" }}>
              {msg}
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(45deg, #e91e63, #ff758c)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Contact;