import { useEffect, useState } from "react";
import { getBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const data = await getBlog();
    setBlogs(data);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blog Posts</h1>

      <div style={styles.grid}>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            style={styles.card}
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            {blog.image_url && (
              <div style={styles.imageWrapper}>
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  style={styles.image}
                />
              </div>
            )}

            <div style={styles.content}>
              <h3 style={styles.blogTitle}>{blog.title}</h3>

              <p style={styles.excerpt}>
                {blog.excerpt}
              </p>

              <div style={styles.tags}>
                {blog.tags?.map((tag, i) => (
                  <span key={i} style={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
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
    padding: "40px",
    color: "white",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },

  card: {
    background: "#111827",
    borderRadius: "15px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%", // Ensures all cards in a row have identical height
  },

  /* 🛠️ Added a wrapper to control the image aspect ratio safely */
  imageWrapper: {
    width: "100%",
    aspectRatio: "16 / 10", // Keeps a cinematic, consistent shape across all screen widths
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Centers and scales the image without distortion
    display: "block",
  },

  content: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexGrow: 1, // Pushes footer/tags to the bottom if text lengths vary
  },

  blogTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },

  excerpt: {
    fontSize: "13px",
    color: "#bbb",
    lineHeight: "1.4",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "auto", // Automatically anchors tags to the bottom of the card
  },

  tag: {
    fontSize: "11px",
    color: "#00d4ff",
  },
};

export default Blog;