import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/api";

function ProjectCaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (err) {
      console.log("Error loading project:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading case study...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={styles.container}>
        <p>Project not found</p>
        <button onClick={() => navigate("/projects")} style={styles.button}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/projects")} style={styles.backBtn}>
        ← Back
      </button>

      {project.image_url && (
        <img src={project.image_url} alt={project.title} style={styles.image} />
      )}

      <h1 style={styles.title}>{project.title}</h1>

      <p style={styles.description}>
        {project.full_description || "No description available."}
      </p>

      <h3 style={styles.sectionTitle}>Tech Stack</h3>

      <div style={styles.stack}>
        {project.tech_stack?.map((tech, index) => (
          <span key={index} style={styles.tech}>
            {tech}
          </span>
        ))}
      </div>

      <h3 style={styles.sectionTitle}>Links</h3>

      <div style={styles.links}>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            GitHub
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0b1120",
    color: "white",
    padding: "40px",
  },

  backBtn: {
    marginBottom: "20px",
    padding: "10px 15px",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    maxHeight: "450px",
    objectFit: "cover",
    borderRadius: "20px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },

  description: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#cbd5e1",
  },

  sectionTitle: {
    marginTop: "30px",
    marginBottom: "10px",
  },

  stack: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  tech: {
    background: "#1e293b",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  links: {
    display: "flex",
    gap: "15px",
  },

  link: {
    padding: "10px 15px",
    background: "#00d4ff",
    color: "black",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  button: {
    padding: "10px 15px",
    background: "#00d4ff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProjectCaseStudy;