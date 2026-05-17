import { useEffect, useState } from "react";
import { getBlog, createBlog, deleteBlog, updateBlog } from "../services/api";

function BlogManager() {
  const [blogs, setBlogs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    tags: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const data = await getBlog();
    setBlogs(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 CREATE OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim())
    };

    if (editId) {
      await updateBlog(editId, payload);
      setEditId(null);
    } else {
      await createBlog(payload);
    }

    setForm({ title: "", excerpt: "", content: "", image_url: "", tags: "" });
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    fetchBlogs();
  };

  // 🔥 LOAD DATA INTO FORM FOR EDIT
  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url,
      tags: blog.tags?.join(", ") || ""
    });

    setEditId(blog.id);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>
          {editId ? "Edit Blog" : "Blog Manager"}
        </h1>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="excerpt"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          style={styles.textarea}
        />

        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {editId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {blogs.map((b) => (
          <div key={b.id} style={styles.card}>
            <h3>{b.title}</h3>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(b)}
                style={styles.editBtn}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(b.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
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
    display: "flex",
    flexDirection: "column",
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
    border: "none",
    background: "#00d4ff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  card: {
    width: "600px",
    background: "#111827",
    color: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
  },

  editBtn: {
    background: "#00d4ff",
    color: "black",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
  }
};

export default BlogManager;