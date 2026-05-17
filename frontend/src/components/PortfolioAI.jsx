import { useState } from "react";
import axios from "axios";

function PortfolioAI() {
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false); // State to handle toggle
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 Ask me anything about this portfolio.",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/portfolio-ai",
        {
          message: input,
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Server error.",
        },
      ]);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      {/* Clickable Header to toggle minimize/maximize */}
      <h1 
        style={styles.title} 
        onClick={() => setIsMinimized(!isMinimized)}
      >
        AI Portfolio Assistant
        <span style={styles.toggleIcon}>
          {isMinimized ? "▲" : "▼"}
        </span>
      </h1>

      {/* Conditional rendering based on minimize state */}
      {!isMinimized && (
        <>
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.aiMessage
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage} style={styles.button}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "350px",
    background: "#111827",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
  },
  title: {
    background: "#00d4ff",
    color: "black",
    textAlign: "center",
    padding: "15px",
    margin: 0,
    fontSize: "18px",
    cursor: "pointer", // Makes it obvious it's clickable
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    userSelect: "none", // Prevents accidental text selection on double click
  },
  toggleIcon: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#0b1120",
  },
  userMessage: {
    alignSelf: "flex-end",
    background: "#00d4ff",
    color: "black",
    padding: "10px 14px",
    borderRadius: "15px",
    maxWidth: "80%",
  },
  aiMessage: {
    alignSelf: "flex-start",
    background: "#1e293b",
    color: "white",
    padding: "10px 14px",
    borderRadius: "15px",
    maxWidth: "80%",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    gap: "10px",
    background: "#111827",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    background: "#00d4ff",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default PortfolioAI;