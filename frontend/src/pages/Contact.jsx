import { useEffect, useState } from "react";
import { getContact } from "../services/api";

function Contact() {

  const [data, setData] = useState(null);

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {

    fetchData();

    // Inject interactive styles
    if (!document.getElementById("contact-page-styles")) {

      const styleSheet = document.createElement("style");

      styleSheet.id = "contact-page-styles";

      styleSheet.innerText = `

        .input-glow {

          transition: all 0.3s ease !important;
        }

        .input-glow:focus {

          border-color: #00d4ff !important;

          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2) !important;

          background: #1e293b !important;
        }

        .btn-hover {

          transition:
            all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }

        .btn-hover:hover {

          transform: translateY(-2px);

          box-shadow:
            0 5px 15px rgba(0, 212, 255, 0.4);

          filter: brightness(1.1);
        }

        .social-link {

          transition: all 0.2s ease !important;
        }

        .social-link:hover {

          color: #00d4ff !important;

          transform: translateX(5px);
        }

      `;

      document.head.appendChild(styleSheet);
    }

  }, []);

  const fetchData = async () => {

    try {

      const res = await getContact();

      setData(res);

    } catch (err) {

      console.log(err);
    }
  };

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(

        "https://bharath-portfolio-7gje.onrender.com/contact-submit",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formInput),
        }
      );

      const result = await response.json();

      if (response.ok) {

        alert("Message sent successfully!");

        setFormInput({
          name: "",
          email: "",
          message: "",
        });

      } else {

        alert(result.error || "Something went wrong.");
      }

    } catch (error) {

      console.error("Failed to send message:", error);

      alert("Could not connect to backend server.");
    }
  };

  // Loading state

  if (!data) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#0b1120",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <h1
          style={{
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          Loading...
        </h1>

      </div>

    );
  }

  const styles = {

    container: {

      minHeight: "100vh",

      background: "#0b1120",

      color: "white",

      display: "flex",

      justifyContent: "center",

      alignItems: isMobile ? "flex-start" : "center",

      padding: isMobile ? "40px 16px" : "80px 20px",

      boxSizing: "border-box",
    },

    contentWrapper: {

      display: "flex",

      flexDirection: isMobile ? "column" : "row",

      maxWidth: "1100px",

      width: "100%",

      gap: isMobile ? "30px" : "60px",

      alignItems: "stretch",
    },

    leftColumn: {

      flex: "1 1 400px",

      display: "flex",

      flexDirection: "column",

      justifyContent: "center",
    },

    title: {

      fontSize: isMobile ? "34px" : "42px",

      margin: "0 0 15px 0",

      fontWeight: "bold",

      letterSpacing: "-0.5px",

      textAlign: isMobile ? "center" : "left",
    },

    description: {

      fontSize: isMobile ? "15px" : "16px",

      lineHeight: "1.7",

      color: "#94a3b8",

      margin: "0 0 30px 0",

      textAlign: isMobile ? "center" : "left",
    },

    infoCard: {

      background: "#111827",

      padding: isMobile ? "22px" : "30px",

      borderRadius: "20px",

      border: "1px solid #1e293b",

      display: "flex",

      flexDirection: "column",

      gap: "22px",
    },

    infoRow: {

      display: "flex",

      alignItems: "center",

      gap: "16px",
    },

    icon: {

      fontSize: "22px",

      background: "#1e293b",

      minWidth: "48px",

      height: "48px",

      display: "flex",

      justifyContent: "center",

      alignItems: "center",

      borderRadius: "12px",

      border: "1px solid #334155",
    },

    infoLabel: {

      margin: 0,

      fontSize: "12px",

      textTransform: "uppercase",

      letterSpacing: "0.5px",

      color: "#64748b",
    },

    infoValue: {

      margin: 0,

      fontSize: isMobile ? "14px" : "16px",

      color: "#00d4ff",

      textDecoration: "none",

      fontWeight: "500",

      wordBreak: "break-word",
    },

    infoValueText: {

      margin: 0,

      fontSize: isMobile ? "14px" : "16px",

      color: "#f8fafc",

      fontWeight: "500",
    },

    divider: {

      border: "none",

      borderTop: "1px solid #1e293b",

      margin: "5px 0",
    },

    socialContainer: {

      display: "flex",

      flexDirection: "column",

      gap: "12px",
    },

    socialAnchor: {

      display: "flex",

      justifyContent: "space-between",

      alignItems: "center",

      background: "#0b1120",

      padding: "14px 18px",

      borderRadius: "12px",

      color: "#cbd5e1",

      textDecoration: "none",

      fontSize: "14px",

      fontWeight: "500",

      border: "1px solid #1e293b",
    },

    rightColumn: {

      flex: "1 1 450px",

      display: "flex",
    },

    contactForm: {

      background: "#111827",

      padding: isMobile ? "22px" : "40px",

      borderRadius: "20px",

      border: "1px solid #1e293b",

      width: "100%",

      display: "flex",

      flexDirection: "column",

      gap: "22px",

      boxSizing: "border-box",

      justifyContent: "center",
    },

    formGroup: {

      display: "flex",

      flexDirection: "column",

      gap: "8px",
    },

    formLabel: {

      fontSize: "14px",

      color: "#cbd5e1",

      fontWeight: "500",
    },

    formInput: {

      background: "#0b1120",

      border: "1px solid #1e293b",

      borderRadius: "10px",

      padding: "14px",

      color: "white",

      fontSize: "15px",

      outline: "none",

      width: "100%",

      boxSizing: "border-box",
    },

    formTextArea: {

      background: "#0b1120",

      border: "1px solid #1e293b",

      borderRadius: "10px",

      padding: "14px",

      color: "white",

      fontSize: "15px",

      outline: "none",

      resize: "none",

      width: "100%",

      boxSizing: "border-box",

      fontFamily: "inherit",
    },

    submitBtn: {

      background: "#00d4ff",

      color: "black",

      border: "none",

      borderRadius: "10px",

      padding: "16px",

      fontSize: "16px",

      fontWeight: "bold",

      cursor: "pointer",

      marginTop: "5px",

      width: "100%",
    },
  };

  return (

    <div style={styles.container}>

      <div style={styles.contentWrapper}>

        {/* LEFT */}

        <div style={styles.leftColumn}>

          <h1 style={styles.title}>
            {data.form_title || "Get In Touch"}
          </h1>

          <p style={styles.description}>
            {
              data.form_description ||
              "Have a project in mind or want to talk tech?"
            }
          </p>

          <div style={styles.infoCard}>

            <div style={styles.infoRow}>

              <span style={styles.icon}>📧</span>

              <div>

                <p style={styles.infoLabel}>
                  Email Me
                </p>

                <a
                  href={`mailto:${data.email}`}
                  style={styles.infoValue}
                >
                  {data.email}
                </a>

              </div>

            </div>

            <div style={styles.infoRow}>

              <span style={styles.icon}>📞</span>

              <div>

                <p style={styles.infoLabel}>
                  Call Me
                </p>

                <p style={styles.infoValueText}>
                  {data.phone}
                </p>

              </div>

            </div>

            <div style={styles.infoRow}>

              <span style={styles.icon}>📍</span>

              <div>

                <p style={styles.infoLabel}>
                  Location
                </p>

                <p style={styles.infoValueText}>
                  {data.location}
                </p>

              </div>

            </div>

            <hr style={styles.divider} />

            <div style={styles.socialContainer}>

              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                style={styles.socialAnchor}
              >
                <span>💻 GitHub</span> ↗
              </a>

              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                style={styles.socialAnchor}
              >
                <span>👔 LinkedIn</span> ↗
              </a>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div style={styles.rightColumn}>

          <form
            onSubmit={handleSubmit}
            style={styles.contactForm}
          >

            <div style={styles.formGroup}>

              <label style={styles.formLabel}>
                Your Name
              </label>

              <input
                type="text"
                name="name"
                value={formInput.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="input-glow"
                style={styles.formInput}
              />

            </div>

            <div style={styles.formGroup}>

              <label style={styles.formLabel}>
                Your Email
              </label>

              <input
                type="email"
                name="email"
                value={formInput.email}
                onChange={handleInputChange}
                placeholder="Email address"
                required
                className="input-glow"
                style={styles.formInput}
              />

            </div>

            <div style={styles.formGroup}>

              <label style={styles.formLabel}>
                Message
              </label>

              <textarea
                name="message"
                value={formInput.message}
                onChange={handleInputChange}
                placeholder="Type your thoughts here..."
                rows="5"
                required
                className="input-glow"
                style={styles.formTextArea}
              />

            </div>

            <button
              type="submit"
              className="btn-hover"
              style={styles.submitBtn}
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;
