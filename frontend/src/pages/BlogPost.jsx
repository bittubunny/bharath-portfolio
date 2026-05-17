import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/api";

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const data = await getBlogById(id);
    setBlog(data);
  };

  if (!blog) return <div style={{ color: "white" }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        {blog.image_url && (
          <img src={blog.image_url} style={styles.image} />
        )}

        <h1 style={styles.title}>{blog.title}</h1>

        <div style={styles.meta}>
          <span>{new Date(blog.created_at).toDateString()}</span>
          <span> • 3 min read</span>
        </div>

        <p style={styles.content}>
          {blog.content}
        </p>

        <div style={styles.tags}>
          {blog.tags?.map((t, i) => (
            <span key={i} style={styles.tag}>#{t}</span>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0b1120",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
  },

  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  image: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  meta: {
    color: "#888",
    fontSize: "13px",
    marginBottom: "20px",
  },

  content: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#ddd",
    whiteSpace: "pre-line",
  },

  tags: {
    marginTop: "20px",
    display: "flex",
    gap: "8px",
  },

  tag: {
    color: "#00d4ff",
  },
};

export default BlogPost;