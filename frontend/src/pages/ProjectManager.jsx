import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../services/api";

function ProjectsManager() {

  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] = useState({

    title: "",

    short_description: "",

    full_description: "",

    problem: "",

    features: "",

    result_images: "",

    image_url: "",

    github_url: "",

    live_url: "",

    tech_stack: "",

    category: "",

    featured: false,

    completion_date: "",
  });

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {

      ...formData,

      tech_stack:
        formData.tech_stack
          .split(",")
          .map((item) => item.trim()),

      features:
        formData.features
          .split(",")
          .map((item) => item.trim()),

      result_images:
        formData.result_images
          .split(",")
          .map((item) => item.trim()),
    };

    try {

      if (editingId) {

        await updateProject(
          editingId,
          payload
        );

        alert("Project updated");

      } else {

        await createProject(payload);

        alert("Project added");

      }

      fetchProjects();

      setFormData({

        title: "",

        short_description: "",

        full_description: "",

        problem: "",

        features: "",

        result_images: "",

        image_url: "",

        github_url: "",

        live_url: "",

        tech_stack: "",

        category: "",

        featured: false,

        completion_date: "",
      });

      setEditingId(null);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteProject(id);

      fetchProjects();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (project) => {

    setEditingId(project.id);

    setFormData({

      title: project.title,

      short_description:
        project.short_description,

      full_description:
        project.full_description,

      problem:
        project.problem || "",

      features:
        project.features?.join(", ") || "",

      result_images:
        project.result_images?.join(", ") || "",

      image_url: project.image_url,

      github_url: project.github_url,

      live_url: project.live_url,

      tech_stack:
        project.tech_stack?.join(", ") || "",

      category: project.category,

      featured: project.featured,

      completion_date:
        project.completion_date,
    });

  };

  return (

    <div style={styles.container}>

      <div style={styles.formContainer}>

        <h1>
          {
            editingId
              ? "Edit Project"
              : "Add Project"
          }
        </h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="short_description"
            placeholder="Short Description"
            value={formData.short_description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <textarea
            name="full_description"
            placeholder="Full Description"
            value={formData.full_description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <textarea
            name="problem"
            placeholder="Problem Statement"
            value={formData.problem}
            onChange={handleChange}
            style={styles.textarea}
          />

          <input
            type="text"
            name="features"
            placeholder="Features (comma separated)"
            value={formData.features}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="result_images"
            placeholder="Result Image URLs (comma separated)"
            value={formData.result_images}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="github_url"
            placeholder="GitHub URL"
            value={formData.github_url}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="live_url"
            placeholder="Live URL"
            value={formData.live_url}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="tech_stack"
            placeholder="Tech Stack (comma separated)"
            value={formData.tech_stack}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="completion_date"
            placeholder="Completion Date"
            value={formData.completion_date}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.checkboxLabel}>

            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />

            Featured Project

          </label>

          <button style={styles.button}>

            {
              editingId
                ? "Update Project"
                : "Add Project"
            }

          </button>

        </form>

      </div>

      <div style={styles.projectsContainer}>

        <h1>Existing Projects</h1>

        {

          projects.map((project) => (

            <div
              key={project.id}
              style={styles.projectCard}
            >

              <img
                src={project.image_url}
                alt={project.title}
                style={styles.image}
              />

              <h2>{project.title}</h2>

              <p>
                {project.short_description}
              </p>

              <div style={styles.techStack}>

                {

                  project.tech_stack?.map(

                    (tech, index) => (

                      <span
                        key={index}
                        style={styles.tech}
                      >

                        {tech}

                      </span>

                    )

                  )

                }

              </div>

              <button
                onClick={() =>
                  handleEdit(project)
                }
                style={styles.editButton}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(project.id)
                }
                style={styles.deleteButton}
              >
                Delete
              </button>

            </div>

          ))

        }

      </div>

    </div>

  );
}


const styles = {

  container: {

    minHeight: "100vh",

    background: "#0b1120",

    padding: "40px",

    color: "white",
  },

  formContainer: {

    maxWidth: "700px",

    margin: "0 auto 60px",
  },

  form: {

    display: "flex",

    flexDirection: "column",

    gap: "20px",
  },

  input: {

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    outline: "none",
  },

  textarea: {

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    outline: "none",

    minHeight: "120px",

    resize: "vertical",
  },

  button: {

    padding: "16px",

    border: "none",

    borderRadius: "10px",

    background: "#00d4ff",

    fontWeight: "bold",

    cursor: "pointer",
  },

  checkboxLabel: {

    display: "flex",

    gap: "10px",

    alignItems: "center",
  },

  projectsContainer: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",

    gap: "30px",
  },

  projectCard: {

    background: "#111827",

    padding: "20px",

    borderRadius: "20px",
  },

  image: {

    width: "100%",

    height: "200px",

    objectFit: "cover",

    borderRadius: "12px",

    marginBottom: "20px",
  },

  techStack: {

    display: "flex",

    gap: "10px",

    flexWrap: "wrap",

    marginTop: "15px",

    marginBottom: "20px",
  },

  tech: {

    background: "#1e293b",

    padding: "8px 14px",

    borderRadius: "20px",

    fontSize: "14px",
  },

  editButton: {

    marginRight: "10px",

    padding: "10px 20px",

    border: "none",

    borderRadius: "10px",

    background: "#00d4ff",

    color: "black",

    cursor: "pointer",
  },

  deleteButton: {

    padding: "10px 20px",

    border: "none",

    borderRadius: "10px",

    background: "red",

    color: "white",

    cursor: "pointer",
  },
};

export default ProjectsManager;