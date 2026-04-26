import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard 
          setIsLoggedIn={setIsLoggedIn} 
          username={username} 
        />
      ) : (
        <Login 
          setIsLoggedIn={setIsLoggedIn} 
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default App;