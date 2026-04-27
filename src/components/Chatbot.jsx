import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I am Glow Assistant. How can I help you?" }
  ]);

  const navigate = useNavigate();

  const handleSend = (msg) => {
    if (!msg.trim()) return;

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

    setInput("");
  };

  return (
    <>
      {/* CHAT BUTTON */}
      <div style={chatButton} onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* CHAT BOX */}
      {open && (
        <div style={chatBox}>

          <div style={chatHeader}>
            Glow Assistant 🤖
          </div>

          {/* MESSAGES */}
          <div style={chatBody}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.from === "user" ? "right" : "left",
                  margin: "5px 0"
                }}
              >
                <span style={{
                  background: m.from === "user" ? "#e91e63" : "#eee",
                  color: m.from === "user" ? "#fff" : "#000",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  display: "inline-block"
                }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {/* INPUT BOX (NEW PREMIUM FEATURE) */}
          <div style={inputBox}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              style={inputStyle}
            />
            <button onClick={() => handleSend(input)} style={sendBtn}>
              ➤
            </button>
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
  zIndex: 99999
};

const chatBox = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  height: "380px",
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  zIndex: 99999
};

const chatHeader = {
  background: "#e91e63",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
  borderRadius: "12px 12px 0 0"
};

const chatBody = {
  flex: 1,
  padding: "10px",
  overflowY: "auto",
  fontSize: "14px"
};

const inputBox = {
  display: "flex",
  borderTop: "1px solid #ddd"
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  border: "none",
  outline: "none"
};

const sendBtn = {
  background: "#e91e63",
  color: "#fff",
  border: "none",
  padding: "10px 12px",
  cursor: "pointer"
};

export default Chatbot;