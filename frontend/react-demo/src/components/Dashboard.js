import React, { useEffect, useState } from "react";

function Dashboard({ setIsLoggedIn, username }) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const storedUser = localStorage.getItem("username");

  const fetchFiles = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/files/${storedUser}`
      );
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const upload = async () => {
    if (!file) {
      alert("Select file");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("username", storedUser);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: fd
    });

    setFile(null);
    fetchFiles();
  };

  const deleteFile = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    });
    fetchFiles();
  };

  const logout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <h2>📁 Digital Locker</h2>
        <div>
          <span>👋 {username || storedUser}</span>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="container">
        <h3>Upload File</h3>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={upload}>Upload</button>

        <h3>Your Files</h3>

        {files.length === 0 ? (
          <p className="empty">No files uploaded</p>
        ) : (
          <div className="file-grid">
            {files.map((f) => (
              <div className="file-card" key={f._id}>
                <p>{f.originalname}</p>

                <div className="actions">
                  <a
                    href={`http://localhost:5000/uploads/${f.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>

                  <button onClick={() => deleteFile(f._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;