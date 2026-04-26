import React, { useState } from "react";

function Login({ setIsLoggedIn, setUsername }) {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const signup = async () => {
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    alert("Signup successful");
  };

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.message === "Login successful") {
      setUsername(username);
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>🔐 Digital Locker</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;