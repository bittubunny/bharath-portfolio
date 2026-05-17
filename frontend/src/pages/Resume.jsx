import { useEffect, useState } from "react";

import { getResume } from "../services/api";

function Resume() {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    fetchResume();

  }, []);

  const fetchResume = async () => {

    try {

      const response =
        await getResume();

      setData(response);

    } catch (error) {

      console.log(error);

    }

  };

  if (!data) {

    return <h1>Loading...</h1>;

  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <img
          src={data.preview_image}
          alt="Resume Preview"
          style={styles.image}
        />

        <h1>
          {data.resume_title}
        </h1>

        <p style={styles.description}>
          {data.resume_description}
        </p>

        <div style={styles.buttons}>

          <a
            href={data.resume_url}
            target="_blank"
            rel="noreferrer"
            style={styles.primaryButton}
          >
            View Resume
          </a>

          <a
            href={data.resume_url}
            download
            style={styles.secondaryButton}
          >
            Download Resume
          </a>

        </div>

      </div>

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

    color: "white",
  },

  card: {

    maxWidth: "700px",

    background: "#111827",

    padding: "40px",

    borderRadius: "20px",

    textAlign: "center",
  },

  image: {

    width: "100%",

    borderRadius: "15px",

    marginBottom: "30px",
  },

  description: {

    lineHeight: "1.8",

    color: "#cbd5e1",

    marginTop: "20px",
  },

  buttons: {

    display: "flex",

    justifyContent: "center",

    gap: "20px",

    marginTop: "30px",

    flexWrap: "wrap",
  },

  primaryButton: {

    padding: "14px 28px",

    background: "#00d4ff",

    color: "black",

    borderRadius: "10px",

    textDecoration: "none",

    fontWeight: "bold",
  },

  secondaryButton: {

    padding: "14px 28px",

    border: "1px solid white",

    color: "white",

    borderRadius: "10px",

    textDecoration: "none",
  },
};

export default Resume;