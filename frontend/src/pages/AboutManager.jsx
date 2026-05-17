import { useEffect, useState } from "react";

import {
  getAbout,
  updateAbout,
} from "../services/api";

function AboutManager() {

  const [aboutId, setAboutId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      profile_image: "",

      full_name: "",

      role_title: "",

      short_bio: "",

      long_bio: "",

      years_experience: "",

      projects_completed: "",

      skills: "",

      technologies: "",
    });

  useEffect(() => {

    fetchAbout();

  }, []);

  const fetchAbout = async () => {

    try {

      const data = await getAbout();

      setAboutId(data.id);

      setFormData({

        profile_image:
          data.profile_image || "",

        full_name:
          data.full_name || "",

        role_title:
          data.role_title || "",

        short_bio:
          data.short_bio || "",

        long_bio:
          data.long_bio || "",

        years_experience:
          data.years_experience || "",

        projects_completed:
          data.projects_completed || "",

        skills:
          data.skills?.join(", ") || "",

        technologies:
          data.technologies?.join(", ") || "",
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

      const payload = {

        ...formData,

        skills:
          formData.skills
            .split(",")
            .map((item) =>
              item.trim()
            ),

        technologies:
          formData.technologies
            .split(",")
            .map((item) =>
              item.trim()
            ),
      };

      await updateAbout(
        aboutId,
        payload
      );

      alert("About updated");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.formContainer}>

        <h1>About Manager</h1>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <input
            type="text"
            name="profile_image"
            placeholder="Profile Image URL"
            value={formData.profile_image}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="role_title"
            placeholder="Role Title"
            value={formData.role_title}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="short_bio"
            placeholder="Short Bio"
            value={formData.short_bio}
            onChange={handleChange}
            style={styles.textarea}
          />

          <textarea
            name="long_bio"
            placeholder="Long Bio"
            value={formData.long_bio}
            onChange={handleChange}
            style={styles.textarea}
          />

          <input
            type="text"
            name="years_experience"
            placeholder="Years Experience"
            value={formData.years_experience}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="projects_completed"
            placeholder="Projects Completed"
            value={formData.projects_completed}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="technologies"
            placeholder="Technologies (comma separated)"
            value={formData.technologies}
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button}>
            Update About
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

export default AboutManager;