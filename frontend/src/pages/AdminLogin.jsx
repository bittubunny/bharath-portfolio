import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AdminLogin() {

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault(); 

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          password,
        }
      );

      if (response.data.success) {

        localStorage.setItem("isAdmin", true);

        navigate("/admin-dashboard");

      } else {

        setMessage("Wrong password");

      }

    } catch (error) {

      setMessage("Server error");

    }

  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleLogin}
        style={styles.form}
      >

        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>
          Login
        </button>

        <p>{message}</p>

      </form>

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

  form: {
    width: "350px",
    padding: "40px",
    borderRadius: "20px",
    background: "#111827",

    display: "flex",
    flexDirection: "column",

    gap: "20px",

    color: "white",
  },

  input: {
    padding: "14px",

    borderRadius: "10px",

    border: "none",

    outline: "none",
  },

  button: {
    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background: "#00d4ff",

    cursor: "pointer",

    fontWeight: "bold",
  },

};

export default AdminLogin;