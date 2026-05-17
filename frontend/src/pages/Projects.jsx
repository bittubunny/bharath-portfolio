import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

      console.log(data);

    } catch (error) {

      console.log(error);
    }
  };

  const categories = [

    "All",

    ...new Set(
      projects.map((project) => project.category)
    ),
  ];

  const filteredProjects =

    selectedCategory === "All"

      ? projects

      : projects.filter(

          (project) =>
            project.category === selectedCategory
        );

  const styles = {

    container: {

      minHeight: "100vh",

      background: "#0b1120",

      color: "white",

      padding: isMobile
        ? "40px 16px"
        : "60px 40px",

      boxSizing: "border-box",
    },

    title: {

      textAlign: "center",

      fontSize: isMobile ? "34px" : "48px",

      marginBottom: isMobile ? "30px" : "40px",

      fontWeight: "bold",
    },

    filters: {

      display: "flex",

      justifyContent: "center",

      gap: "12px",

      flexWrap: "wrap",

      marginBottom: isMobile ? "35px" : "50px",
    },

    filterButton: {

      padding: isMobile
        ? "8px 16px"
        : "10px 20px",

      borderRadius: "30px",

      border: "1px solid white",

      background: "transparent",

      color: "white",

      cursor: "pointer",

      fontSize: isMobile ? "13px" : "15px",
    },

    activeFilterButton: {

      padding: isMobile
        ? "8px 16px"
        : "10px 20px",

      borderRadius: "30px",

      border: "none",

      background: "#00d4ff",

      color: "black",

      cursor: "pointer",

      fontWeight: "bold",

      fontSize: isMobile ? "13px" : "15px",
    },

    grid: {

      display: "grid",

      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(320px, 1fr))",

      gap: isMobile ? "22px" : "30px",
    },

    card: {

      background: "#111827",

      borderRadius: "20px",

      overflow: "hidden",

      transition: "0.3s",

      paddingBottom: "20px",

      border: "1px solid rgba(255,255,255,0.06)",

      boxShadow:
        "0 8px 24px rgba(0,0,0,0.25)",
    },

    image: {

      width: "100%",

      height: isMobile ? "200px" : "220px",

      objectFit: "cover",
    },

    projectTitle: {

      padding: "20px 20px 10px",

      fontSize: isMobile ? "22px" : "26px",

      margin: 0,
    },

    description: {

      padding: "0 20px",

      color: "#cbd5e1",

      lineHeight: "1.7",

      fontSize: isMobile ? "14px" : "15px",
    },

    techStack: {

      display: "flex",

      gap: "10px",

      flexWrap: "wrap",

      padding: "20px",
    },

    tech: {

      background: "#1e293b",

      padding: isMobile
        ? "6px 12px"
        : "8px 14px",

      borderRadius: "20px",

      fontSize: isMobile ? "12px" : "14px",

      color: "#e2e8f0",
    },

    buttons: {

      display: "flex",

      gap: "12px",

      padding: "0 20px",

      flexWrap: isMobile ? "wrap" : "nowrap",
    },

    githubButton: {

      flex: 1,

      textAlign: "center",

      padding: "12px 18px",

      background: "#00d4ff",

      color: "black",

      borderRadius: "10px",

      textDecoration: "none",

      fontWeight: "bold",

      fontSize: isMobile ? "14px" : "15px",
    },

    liveButton: {

      flex: 1,

      textAlign: "center",

      padding: "12px 18px",

      border: "1px solid white",

      color: "white",

      borderRadius: "10px",

      textDecoration: "none",

      fontSize: isMobile ? "14px" : "15px",
    },
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        My Projects
      </h1>

      {/* FILTERS */}

      <div style={styles.filters}>

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            style={
              selectedCategory === category
                ? styles.activeFilterButton
                : styles.filterButton
            }
          >
            {category}
          </button>

        ))}

      </div>

      {/* PROJECT GRID */}

      <div style={styles.grid}>

        {filteredProjects.map((project) => (

          <div
            key={project.id}
            style={{
              ...styles.card,
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/projects/${project.id}`)
            }
          >

            <img
              src={project.image_url}
              alt={project.title}
              style={styles.image}
            />

            <h2 style={styles.projectTitle}>
              {project.title}
            </h2>

            <p style={styles.description}>
              {project.short_description}
            </p>

            <div style={styles.techStack}>

              {project.tech_stack.map(
                (tech, index) => (

                  <span
                    key={index}
                    style={styles.tech}
                  >
                    {tech}
                  </span>

                )
              )}

            </div>

            <div
              style={styles.buttons}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                style={styles.githubButton}
              >
                GitHub
              </a>

              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                style={styles.liveButton}
              >
                Live Demo
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Projects;
