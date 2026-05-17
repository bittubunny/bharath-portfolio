import { useNavigate } from "react-router-dom";

import axios from "axios";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:5000/logout"
      );

      localStorage.removeItem("isAdmin");

      navigate("/admin-login");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Admin Dashboard</h1>

        <p>
          You are logged in successfully.
        </p>

        <button
          onClick={handleLogout}
          style={styles.button}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

const styles = {

  container: {
    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "#0b1120",
  },

  card: {
    width: "400px",

    padding: "40px",

    borderRadius: "20px",

    background: "#111827",

    color: "white",

    textAlign: "center",
  },

  button: {
    marginTop: "20px",

    padding: "14px 24px",

    border: "none",

    borderRadius: "10px",

    background: "#00d4ff",

    cursor: "pointer",

    fontWeight: "bold",
  },

};

export default AdminDashboard;