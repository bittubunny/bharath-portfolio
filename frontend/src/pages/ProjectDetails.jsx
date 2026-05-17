import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/api";

function ProjectDetails() {

  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  useEffect(() => {

    fetchProject();

  }, []);

  const fetchProject = async () => {

    const data =
      await getProjectById(id);

    setProject(data);

  };

  if (!project) {

    return (

      <div style={styles.container}>

        <p>Loading case study...</p>

      </div>

    );

  }

  return (

    <div style={styles.container}>

      <div style={styles.hero}>

        <h1>{project.title}</h1>

        <p style={styles.subtitle}>
          {project.short_description}
        </p>

        <div style={styles.tags}>

          {project.tech_stack?.map(
            (t, i) => (

              <span
                key={i}
                style={styles.tag}
              >

                {t}

              </span>

            )
          )}

        </div>

      </div>

      {project.image_url && (

        <img
          src={project.image_url}
          alt={project.title}
          style={styles.image}
        />

      )}

      <div style={styles.section}>

        <h2>🚨 Problem</h2>

        <p>
          {
            project.problem ||
            "Problem not added yet"
          }
        </p>

      </div>

      <div style={styles.section}>

        <h2>🛠 Solution</h2>

        <p>
          {project.full_description}
        </p>

      </div>

      <div style={styles.section}>

        <h2>✨ Features</h2>

        <ul style={styles.featuresList}>

          {project.features?.length > 0 ? (

            project.features.map(
              (f, i) => (

                <li key={i}>
                  {f}
                </li>

              )
            )

          ) : (

            <li>
              No features added yet
            </li>

          )}

        </ul>

      </div>

      <div style={styles.section}>

        <h2>📊 Results</h2>

        <div style={styles.resultsGrid}>

          {project.result_images?.length > 0 ? (

            project.result_images.map(
              (img, i) => (

                <img
                  key={i}
                  src={img}
                  alt={`result-${i}`}
                  style={styles.resultImage}
                />

              )
            )

          ) : (

            <p>
              No result images added yet
            </p>

          )}

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {

    minHeight: "100vh",

    background: "#0b1120",

    color: "white",

    padding: "40px",
  },

  hero: {

    marginBottom: "30px",
  },

  subtitle: {

    color: "#aaa",

    fontSize: "18px",

    marginTop: "10px",
  },

  tags: {

    display: "flex",

    gap: "10px",

    flexWrap: "wrap",

    marginTop: "20px",
  },

  tag: {

    background: "#1f2937",

    padding: "6px 14px",

    borderRadius: "8px",

    fontSize: "12px",
  },

  image: {

    width: "100%",

    borderRadius: "15px",

    marginTop: "20px",

    maxHeight: "500px",

    objectFit: "cover",
  },

  section: {

    marginTop: "50px",

    lineHeight: "1.8",
  },

  featuresList: {

    paddingLeft: "20px",

    marginTop: "15px",
  },

  resultsGrid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",

    gap: "20px",

    marginTop: "20px",
  },

  resultImage: {

    width: "100%",

    borderRadius: "15px",

    objectFit: "cover",

    minHeight: "200px",
  },
};

export default ProjectDetails;