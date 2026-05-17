import { useEffect, useState } from "react";

import axios from "axios";

function CurrentPassword() {

  const [password, setPassword] = useState("");

  useEffect(() => {

    fetchPassword();

  }, []);

  const fetchPassword = async () => {

    const response = await axios.get(
      "http://127.0.0.1:5000/current-password"
    );

    setPassword(response.data.password);

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Current Password</h1>

        <h2>{password}</h2>

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
    padding: "40px",

    borderRadius: "20px",

    background: "#111827",

    color: "white",

    textAlign: "center",
  },

};

export default CurrentPassword;