import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/api";

function BlogPost() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    try {

      const data = await getBlogById(id);

      setBlog(data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!blog) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#0b1120",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>

    );
  }

  const styles = {

    container: {

      background: "#0b1120",

      minHeight: "100vh",

      padding: isMobile ? "30px 16px" : "50px 24px",

      color: "white",

      boxSizing: "border-box",
    },

    wrapper: {

      maxWidth: "850px",

      margin: "0 auto",
    },

    image: {

      width: "100%",

      borderRadius: isMobile ? "14px" : "18px",

      marginBottom: isMobile ? "20px" : "30px",

      objectFit: "cover",

      maxHeight: isMobile ? "240px" : "450px",

      border: "1px solid rgba(255,255,255,0.08)",

      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    },

    title: {

      fontSize: isMobile ? "30px" : "48px",

      lineHeight: "1.2",

      marginBottom: "14px",

      fontWeight: "bold",

      letterSpacing: "-1px",
    },

    meta: {

      color: "#94a3b8",

      fontSize: isMobile ? "12px" : "14px",

      marginBottom: isMobile ? "24px" : "32px",

      display: "flex",

      flexWrap: "wrap",

      gap: "8px",
    },

    content: {

      fontSize: isMobile ? "16px" : "19px",

      lineHeight: "2",

      color: "#d1d5db",

      whiteSpace: "pre-line",

      marginBottom: "30px",
    },

    tags: {

      marginTop: "20px",

      display: "flex",

      flexWrap: "wrap",

      gap: "10px",
    },

    tag: {

      color: "#00d4ff",

      background: "rgba(0,212,255,0.08)",

      padding: "6px 12px",

      borderRadius: "999px",

      border: "1px solid rgba(0,212,255,0.15)",

      fontSize: "12px",
    },
  };

  return (

    <div style={styles.container}>

      <div style={styles.wrapper}>

        {blog.image_url && (

          <img
            src={blog.image_url}
            alt={blog.title}
            style={styles.image}
          />

        )}

        <h1 style={styles.title}>
          {blog.title}
        </h1>

        <div style={styles.meta}>

          <span>
            {new Date(blog.created_at).toDateString()}
          </span>

          <span>
            • 3 min read
          </span>

        </div>

        <p style={styles.content}>
          {blog.content}
        </p>

        <div style={styles.tags}>

          {blog.tags?.map((t, i) => (

            <span
              key={i}
              style={styles.tag}
            >
              #{t}
            </span>

          ))}

        </div>

      </div>

    </div>
  );
}

export default BlogPost;
