import { useEffect, useState } from "react";
import { getAbout } from "../services/api";

function About() {

  const [data, setData] = useState(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {

    fetchAbout();

    // Inject animations
    if (!document.getElementById("about-page-animations")) {

      const styleSheet = document.createElement("style");

      styleSheet.id = "about-page-animations";

      styleSheet.innerText = `

        @keyframes float {

          0% { transform: translateY(0px); }

          50% { transform: translateY(-10px); }

          100% { transform: translateY(0px); }

        }

        .animate-float {

          animation: float 4s ease-in-out infinite;
        }

        .hover-card-effect {

          transition:
            transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.3s ease,
            border-color 0.3s ease !important;
        }

        .hover-card-effect:hover {

          transform: translateY(-5px);

          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.1);

          border-color: #00d4ff !important;
        }

        .hover-tag-effect {

          transition: all 0.2s ease !important;
        }

        .hover-tag-effect:hover {

          background: #00d4ff !important;

          color: black !important;

          transform: scale(1.05);

          box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
        }

      `;

      document.head.appendChild(styleSheet);
    }

  }, []);

  const fetchAbout = async () => {

    try {

      const response = await getAbout();

      setData(response);

    } catch (error) {

      console.log(error);
    }
  };

  if (!data) {

    return <h1 style={styles.loading}>Loading...</h1>;
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

      overflow: "hidden",
    },

    contentWrapper: {

      display: "flex",

      flexDirection: isMobile ? "column" : "row",

      maxWidth: "1100px",

      width: "100%",

      gap: isMobile ? "35px" : "60px",

      alignItems: "center",
    },

    leftColumn: {

      width: "100%",

      display: "flex",

      justifyContent: "center",

      paddingTop: isMobile ? "0px" : "20px",
    },

    imageContainerFrame: {

      position: "relative",

      width: isMobile ? "240px" : "360px",

      height: isMobile ? "240px" : "360px",

      borderRadius: "24px",

      display: "flex",

      justifyContent: "center",

      alignItems: "center",
    },

    gradientBorderBg: {

      position: "absolute",

      top: "-3px",

      left: "-3px",

      right: "-3px",

      bottom: "-3px",

      background: "linear-gradient(45deg, #00d4ff, #1e293b, #00d4ff)",

      borderRadius: "27px",

      zIndex: 1,

      opacity: 0.8,

      boxShadow: "0 0 25px rgba(0, 212, 255, 0.25)",
    },

    image: {

      width: "100%",

      height: "100%",

      objectFit: "cover",

      borderRadius: "24px",

      display: "block",

      zIndex: 2,

      position: "relative",

      border: "3px solid #0b1120",
    },

    rightColumn: {

      flex: "2 1 500px",

      display: "flex",

      flexDirection: "column",

      width: "100%",

      textAlign: isMobile ? "center" : "left",
    },

    name: {

      fontSize: isMobile ? "34px" : "42px",

      margin: "0 0 10px 0",

      fontWeight: "bold",

      letterSpacing: "-0.5px",
    },

    role: {

      color: "#00d4ff",

      fontSize: isMobile ? "18px" : "22px",

      margin: "0 0 20px 0",

      fontWeight: "600",
    },

    shortBio: {

      fontSize: isMobile ? "16px" : "19px",

      lineHeight: "1.6",

      color: "#f8fafc",

      marginBottom: "15px",

      fontWeight: "500",
    },

    longBio: {

      fontSize: isMobile ? "15px" : "16px",

      lineHeight: "1.8",

      color: "#94a3b8",

      margin: "0 0 30px 0",
    },

    statsContainer: {

      display: "flex",

      flexDirection: isMobile ? "column" : "row",

      gap: "20px",

      margin: "0 0 35px 0",

      width: "100%",
    },

    statCard: {

      background: "#111827",

      padding: "20px 25px",

      borderRadius: "16px",

      flex: "1 1 160px",

      border: "1px solid #1e293b",

      cursor: "pointer",
    },

    statNumber: {

      fontSize: "32px",

      color: "#00d4ff",

      margin: "0 0 5px 0",

      fontWeight: "bold",
    },

    statLabel: {

      margin: 0,

      color: "#94a3b8",

      fontSize: "14px",

      fontWeight: "500",
    },

    section: {

      marginBottom: "30px",
    },

    sectionTitle: {

      fontSize: "18px",

      textTransform: "uppercase",

      letterSpacing: "1px",

      color: "#cbd5e1",

      margin: "0 0 15px 0",
    },

    tagsContainer: {

      display: "flex",

      gap: "10px",

      flexWrap: "wrap",

      justifyContent: isMobile ? "center" : "flex-start",
    },

    tag: {

      background: "#1e293b",

      color: "#e2e8f0",

      padding: "8px 16px",

      borderRadius: "100px",

      fontSize: "14px",

      fontWeight: "500",

      border: "1px solid #334155",

      cursor: "pointer",
    },

    loading: {

      color: "white",

      textAlign: "center",

      marginTop: "20vh",

      fontFamily: "sans-serif",
    },
  };

  return (

    <div style={styles.container}>

      <div style={styles.contentWrapper}>

        {/* LEFT */}

        <div style={styles.leftColumn}>

          <div className="animate-float" style={styles.imageContainerFrame}>

            <div style={styles.gradientBorderBg}></div>

            <img
              src={data.profile_image}
              alt={data.full_name}
              style={styles.image}
            />

          </div>

        </div>

        {/* RIGHT */}

        <div style={styles.rightColumn}>

          <h1 style={styles.name}>
            {data.full_name}
          </h1>

          <h2 style={styles.role}>
            {data.role_title}
          </h2>

          <p style={styles.shortBio}>
            {data.short_bio}
          </p>

          <p style={styles.longBio}>
            {data.long_bio}
          </p>

          {/* Stats */}

          <div style={styles.statsContainer}>

            <div className="hover-card-effect" style={styles.statCard}>

              <h2 style={styles.statNumber}>
                {data.years_experience}
              </h2>

              <p style={styles.statLabel}>
                Years Experience
              </p>

            </div>

            <div className="hover-card-effect" style={styles.statCard}>

              <h2 style={styles.statNumber}>
                {data.projects_completed}
              </h2>

              <p style={styles.statLabel}>
                Projects Completed
              </p>

            </div>

          </div>

          {/* Skills */}

          <div style={styles.section}>

            <h3 style={styles.sectionTitle}>
              Skills
            </h3>

            <div style={styles.tagsContainer}>

              {data.skills.map((skill, index) => (

                <span
                  key={index}
                  className="hover-tag-effect"
                  style={styles.tag}
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

          {/* Technologies */}

          <div style={styles.section}>

            <h3 style={styles.sectionTitle}>
              Technologies
            </h3>

            <div style={styles.tagsContainer}>

              {data.technologies.map((tech, index) => (

                <span
                  key={index}
                  className="hover-tag-effect"
                  style={styles.tag}
                >
                  {tech}
                </span>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;
