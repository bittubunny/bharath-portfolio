import { useEffect, useState } from "react";

import {
  getHomeContent,
  updateHomeContent,
} from "../services/api";

function HomeManager() {

  const [formData, setFormData] = useState({

    welcome_note: "",

    greeting_name: "",

    typing_titles: "",

    description: "",

    hero_image: "",

    primary_button_text: "",

    primary_button_link: "",

    secondary_button_text: "",

    secondary_button_link: "",
  });


  useEffect(() => {

    fetchData();

  }, []);


  const fetchData = async () => {

    try {

      const data = await getHomeContent();

      setFormData({
        ...data,

        typing_titles:
          data.typing_titles.join(", "),
      });

    } catch (error) {

      console.log(error);

    }

  };


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        ...formData,

        typing_titles:
          formData.typing_titles
            .split(",")
            .map((item) => item.trim()),

      };

      await updateHomeContent(payload);

      alert("Home content updated successfully");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };


  return (

    <div style={styles.container}>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        <h1 style={styles.title}>
          Home Page Manager
        </h1>

        <input
          type="text"
          name="welcome_note"
          placeholder="Welcome Note"
          value={formData.welcome_note}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="greeting_name"
          placeholder="Greeting Name"
          value={formData.greeting_name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="typing_titles"
          placeholder="Typing Titles (comma separated)"
          value={formData.typing_titles}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <input
          type="text"
          name="hero_image"
          placeholder="Hero Image URL"
          value={formData.hero_image}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="primary_button_text"
          placeholder="Primary Button Text"
          value={formData.primary_button_text}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="primary_button_link"
          placeholder="Primary Button Link"
          value={formData.primary_button_link}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="secondary_button_text"
          placeholder="Secondary Button Text"
          value={formData.secondary_button_text}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="secondary_button_link"
          placeholder="Secondary Button Link"
          value={formData.secondary_button_link}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          Save Changes
        </button>

      </form>

    </div>

  );
}


const styles = {

  container: {

    minHeight: "100vh",

    background: "#0b1120",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "40px",
  },

  form: {

    width: "600px",

    background: "#111827",

    padding: "40px",

    borderRadius: "20px",

    display: "flex",

    flexDirection: "column",

    gap: "20px",

    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },

  title: {

    color: "white",

    textAlign: "center",

    marginBottom: "10px",
  },

  input: {

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    outline: "none",

    fontSize: "16px",
  },

  textarea: {

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    outline: "none",

    minHeight: "140px",

    resize: "vertical",

    fontSize: "16px",
  },

  button: {

    padding: "16px",

    borderRadius: "10px",

    border: "none",

    background: "#00d4ff",

    color: "black",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",

    transition: "0.3s",
  },

};

export default HomeManager;