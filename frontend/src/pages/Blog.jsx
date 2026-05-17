import { useEffect, useState } from "react";
import { getBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

function Blog() {

  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const data = await getBlog();

      setBlogs(data);

    } catch (error) {

      console.log(error);
    }
  };

  const styles = {

    container: {

      minHeight: "100vh",

      background: "#0b1120",

      padding: isMobile ? "30px 16px" : "40px",

      color: "white",

      boxSizing: "border-box",
    },

    title: {

      textAlign: "center",

      marginBottom: isMobile ? "25px" : "40px",

      fontSize: isMobile ? "28px" : "38px",

      fontWeight: "bold",
    },

    grid: {

      display: "grid",

      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(4, 1fr)",

      gap: isMobile ? "18px" : "24px",
    },

    card: {

      background: "#111827",

      borderRadius: "18px",

      overflow: "hidden",

      cursor: "pointer",

      transition: "0.3s ease",

      display: "flex",

      flexDirection: "column",

      height: "100%",

      border: "1px solid rgba(255,255,255,0.06)",
    },

    imageWrapper: {

      width: "100%",

      aspectRatio: isMobile ? "16 / 11" : "16 / 10",

      overflow: "hidden",
    },

    image: {

      width: "100%",

      height: "100%",

      objectFit: "cover",

      display: "block",

      transition: "0.3s ease",
    },

    content: {

      padding: isMobile ? "14px" : "18px",

      display: "flex",

      flexDirection: "column",

      gap: "10px",

      flexGrow: 1,
    },

    blogTitle: {

      fontSize: isMobile ? "17px" : "19px",

      fontWeight: "bold",

      margin: 0,

      lineHeight: "1.4",
    },

    excerpt: {

      fontSize: isMobile ? "13px" : "14px",

      color: "#bbb",

      lineHeight: "1.6",

      margin: 0,
    },

    tags: {

      display: "flex",

      flexWrap: "wrap",

      gap: "8px",

      marginTop: "auto",
    },

    tag: {

      fontSize: "11px",

      color: "#00d4ff",

      background: "rgba(0,212,255,0.08)",

      padding: "5px 10px",

      borderRadius: "999px",

      border: "1px solid rgba(0,212,255,0.15)",
    },
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Blog Posts
      </h1>

      <div style={styles.grid}>

        {blogs.map((blog) => (

          <div
            key={blog.id}

            style={styles.card}

            onClick={() => navigate(`/blog/${blog.id}`)}

            onMouseEnter={(e) => {

              e.currentTarget.style.transform =
                "translateY(-6px)";

              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.35)";
            }}

            onMouseLeave={(e) => {

              e.currentTarget.style.transform =
                "translateY(0px)";

              e.currentTarget.style.boxShadow =
                "none";
            }}
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

              <h3 style={styles.blogTitle}>
                {blog.title}
              </h3>

              <p style={styles.excerpt}>
                {blog.excerpt}
              </p>

              <div style={styles.tags}>

                {blog.tags?.map((tag, i) => (

                  <span
                    key={i}
                    style={styles.tag}
                  >
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

export default Blog;
