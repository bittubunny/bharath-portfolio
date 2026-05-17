import { useEffect, useState } from "react";

import {
  getResume,
  updateResume,
} from "../services/api";

import { useNavigate } from "react-router-dom";

function ResumeManager() {

  const navigate = useNavigate();

  const [resumeId, setResumeId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      resume_title: "",

      resume_description: "",

      resume_url: "",

      preview_image: "",
    });

  // 🔐 AUTH CHECK
  useEffect(() => {

    const isAdmin =
      localStorage.getItem("isAdmin");

    if (!isAdmin) {

      navigate("/admin-login");

      return;
    }

    fetchResume();

  }, []);

  const fetchResume = async () => {

    try {

      const data =
        await getResume();

      setResumeId(data.id);

      setFormData({

        resume_title:
          data.resume_title || "",

        resume_description:
          data.resume_description || "",

        resume_url:
          data.resume_url || "",

        preview_image:
          data.preview_image || "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateResume(
        resumeId,
        formData
      );

      alert("Resume updated");

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.formContainer}>

        <h1>Resume Manager</h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <input
            type="text"
            name="resume_title"
            placeholder="Resume Title"
            value={formData.resume_title}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="resume_description"
            placeholder="Resume Description"
            value={formData.resume_description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <input
            type="text"
            name="resume_url"
            placeholder="Resume PDF URL"
            value={formData.resume_url}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="preview_image"
            placeholder="Preview Image URL"
            value={formData.preview_image}
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button}>
            Update Resume
          </button>

        </form>

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

    margin: "0 auto",
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
  },

  button: {

    padding: "16px",

    border: "none",

    borderRadius: "10px",

    background: "#00d4ff",

    fontWeight: "bold",

    cursor: "pointer",
  },
};

export default ResumeManager;