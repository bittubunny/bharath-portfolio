import { useEffect, useState } from "react";
import { getContact, updateContact } from "../services/api";

function ContactManager() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    form_title: "",
    form_description: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getContact();

      setForm({
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        form_title: data.form_title || "",
        form_description: data.form_description || ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateContact(form); // ✅ ONLY FORM (NO ID)
      alert("Contact updated successfully");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Contact Manager</h1>

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={styles.input} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" style={styles.input} />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" style={styles.input} />
        <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub" style={styles.input} />
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn" style={styles.input} />
        <input name="form_title" value={form.form_title} onChange={handleChange} placeholder="Form Title" style={styles.input} />

        <textarea
          name="form_description"
          value={form.form_description}
          onChange={handleChange}
          placeholder="Form Description"
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
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
  },

  title: {
    color: "white",
    textAlign: "center",
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
    minHeight: "140px",
  },

  button: {
    padding: "16px",
    borderRadius: "10px",
    background: "#00d4ff",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ContactManager;