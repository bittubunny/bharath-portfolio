import { useState, useEffect, useRef } from "react";
import axios from "axios";

function PortfolioAI() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 1. Added loading state
  const chatEndRef = useRef(null); // 2. Reference for auto-scrolling

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 Ask me anything about my portfolio, tech stack, or social media links!",
    },
  ]);

  // 3. Auto-scroll to bottom whenever messages update or loading state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    setInput("");
    setIsLoading(true); // Start loading animation

    try {
      const response = await axios.post(
        "https://bharath-portfolio-7gje.onrender.com/portfolio-ai",
        { message: currentInput }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Looks like the server is taking a quick break. Mind trying again?",
        },
      ]);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <>
      {/* BOT CIRCLE */}
      {!isOpen && (
        <div style={styles.botCircle} onClick={() => setIsOpen(true)}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="AI Bot"
            style={styles.botImage}
          />
        </div>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div style={styles.container}>
          {/* HEADER */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt="Bot"
                style={styles.headerBot}
              />
              <div>
                <h3 style={styles.headerTitle}>AI Assistant</h3>
                <p style={styles.headerSubtitle}>Online</p>
              </div>
            </div>
            <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* CHAT AREA */}
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "user" ? styles.userMessage : styles.aiMessage
                }
              >
                {msg.text}
              </div>
            ))}
            
            {/* 4. Typing Indicator placeholder */}
            {isLoading && (
              <div style={styles.aiMessage}>
                <span style={styles.typing}>Typing...</span>
              </div>
            )}
            
            {/* Invisible element to hook the scroll anchor */}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT AREA */}
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
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              style={{ ...styles.button, opacity: isLoading ? 0.6 : 1 }}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  /* FLOATING BOT */
  botCircle: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#00d4ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 0 25px rgba(0,212,255,0.5)",
    zIndex: 9999,
  },

  botImage: {
    width: "42px",
    height: "42px",
    objectFit: "contain",
  },

  /* CHAT CONTAINER */
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: window.innerWidth <= 768 ? "calc(100% - 24px)" : "360px",
    maxWidth: "360px",
    height: window.innerWidth <= 768 ? "80vh" : "550px",
    background: "#111827",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
    border: "1px solid rgba(255,255,255,0.08)",
  },

  /* HEADER */
  header: {
    background: "#00d4ff",
    color: "black",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  headerBot: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "white",
    padding: "4px",
  },

  headerTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "bold",
  },

  headerSubtitle: {
    margin: 0,
    fontSize: "12px",
  },

  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "black",
    fontWeight: "bold",
  },

  /* CHAT */
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#0b1120",
  },

  userMessage: {
    alignSelf: "flex-end",
    background: "#00d4ff",
    color: "black",
    padding: "12px 15px",
    borderRadius: "16px 16px 4px 16px",
    maxWidth: "80%",
    lineHeight: "1.5",
    fontSize: "14px",
  },

  aiMessage: {
    alignSelf: "flex-start",
    background: "#1e293b",
    color: "white",
    padding: "12px 15px",
    borderRadius: "16px 16px 16px 4px",
    maxWidth: "80%",
    lineHeight: "1.5",
    fontSize: "14px",
  },

  /* INPUT */
  inputArea: {
    display: "flex",
    padding: "12px",
    gap: "10px",
    background: "#111827",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #1e293b",
    outline: "none",
    background: "#0b1120",
    color: "white",
    fontSize: "14px",
  },

  button: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "none",
    background: "#00d4ff",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },

  typing: {
    fontStyle: "italic",
    color: "#94a3b8",
  },
};

export default PortfolioAI;
