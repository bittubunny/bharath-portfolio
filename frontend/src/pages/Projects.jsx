import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate(); // ✅ ADD THIS

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
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Projects</h1>

      {/* FILTER BUTTONS */}
      <div style={styles.filters}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
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

      {/* PROJECTS GRID */}
      <div style={styles.grid}>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            style={{
              ...styles.card,
              cursor: "pointer", // ✅ makes it feel clickable
            }}
            onClick={() => navigate(`/projects/${project.id}`)} // 🔥 CASE STUDY ROUTE
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
              {project.tech_stack.map((tech, index) => (
                <span key={index} style={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>

            {/* buttons still work normally */}
            <div style={styles.buttons} onClick={(e) => e.stopPropagation()}>
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


const styles = {

  container: {

    minHeight: "100vh",

    background: "#0b1120",

    color: "white",

    padding: "60px 40px",
  },

  title: {

    textAlign: "center",

    fontSize: "48px",

    marginBottom: "40px",
  },

  filters: {

    display: "flex",

    justifyContent: "center",

    gap: "15px",

    flexWrap: "wrap",

    marginBottom: "50px",
  },

  filterButton: {

    padding: "10px 20px",

    borderRadius: "30px",

    border: "1px solid white",

    background: "transparent",

    color: "white",

    cursor: "pointer",
  },

  activeFilterButton: {

    padding: "10px 20px",

    borderRadius: "30px",

    border: "none",

    background: "#00d4ff",

    color: "black",

    cursor: "pointer",

    fontWeight: "bold",
  },

  grid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",

    gap: "30px",
  },

  card: {

    background: "#111827",

    borderRadius: "20px",

    overflow: "hidden",

    transition: "0.3s",

    paddingBottom: "20px",
  },

  image: {

    width: "100%",

    height: "220px",

    objectFit: "cover",
  },

  projectTitle: {

    padding: "20px 20px 10px",
  },

  description: {

    padding: "0 20px",

    color: "#cbd5e1",

    lineHeight: "1.7",
  },

  techStack: {

    display: "flex",

    gap: "10px",

    flexWrap: "wrap",

    padding: "20px",
  },

  tech: {

    background: "#1e293b",

    padding: "8px 14px",

    borderRadius: "20px",

    fontSize: "14px",
  },

  buttons: {

    display: "flex",

    gap: "15px",

    padding: "0 20px",
  },

  githubButton: {

    padding: "10px 20px",

    background: "#00d4ff",

    color: "black",

    borderRadius: "10px",

    textDecoration: "none",

    fontWeight: "bold",
  },

  liveButton: {

    padding: "10px 20px",

    border: "1px solid white",

    color: "white",

    borderRadius: "10px",

    textDecoration: "none",
  },
};

export default Projects;