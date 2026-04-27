import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I am Glow Assistant. How can I help you?" }
  ]);

  const navigate = useNavigate();

  const handleUserMessage = (msg) => {
    const userMsg = { from: "user", text: msg };

    let botReply = "";

    if (msg.toLowerCase().includes("book")) {
      botReply = "Redirecting to booking page... ✨";
      setTimeout(() => navigate("/booking"), 1000);
    } 
    else if (msg.toLowerCase().includes("service")) {
      botReply = "We offer Hair, Facial, Makeup, Nail Art 💅";
    } 
    else if (msg.toLowerCase().includes("price")) {
      botReply = "Prices start from ₹500 💰";
    } 
    else {
      botReply = "I can help you with Booking, Services, and Price 😊";
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      { from: "bot", text: botReply }
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <div style={chatButton} onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Box */}
      {open && (
        <div style={chatBox}>
          <div style={chatHeader}>Glow Assistant 🤖</div>

          <div style={chatBody}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.from === "user" ? "right" : "left",
                  margin: "5px 0"
                }}
              >
                <span
                  style={{
                    background: m.from === "user" ? "#e91e63" : "#eee",
                    color: m.from === "user" ? "#fff" : "#000",
                    padding: "6px 10px",
                    borderRadius: "10px",
                    display: "inline-block"
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div style={chatFooter}>
            <button onClick={() => handleUserMessage("book")}>Book</button>
            <button onClick={() => handleUserMessage("services")}>Services</button>
            <button onClick={() => handleUserMessage("price")}>Price</button>
          </div>
        </div>
      )}
    </>
  );
}

/* STYLES */

const chatButton = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#e91e63",
  color: "#fff",
  padding: "15px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
  zIndex: 1000
};

const chatBox = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "280px",
  height: "350px",
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000
};

const chatHeader = {
  background: "#e91e63",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px"
};

const chatBody = {
  flex: 1,
  padding: "10px",
  overflowY: "auto",
  fontSize: "14px"
};

const chatFooter = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px",
  borderTop: "1px solid #ddd"
};

export default Chatbot;