const baseURL = "http://localhost:5000";

// jQuery demo
$(document).ready(function () {
  $("#jqbtn").click(function () {
    alert("jQuery working!");
  });
});

// SIGNUP
async function signup() {
  const u = document.getElementById("su").value;
  const p = document.getElementById("sp").value;

  if (!u || !p) {
    alert("Fill all fields");
    return;
  }

  await fetch(baseURL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u, password: p })
  });

  alert("Signup successful");
}

// LOGIN
async function login() {
  const u = document.getElementById("lu").value;
  const p = document.getElementById("lp").value;

  const res = await fetch(baseURL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: u, password: p })
  });

  const data = await res.json();

  if (data.message === "Login successful") {
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed");
  }
}

// LOGOUT
function logout() {
  window.location.href = "index.html";
}

// UPLOAD
async function upload() {
  const f = document.getElementById("file").files[0];

  if (!f) {
    alert("Select file");
    return;
  }

  const fd = new FormData();
  fd.append("file", f);

  await fetch(baseURL + "/upload", {
    method: "POST",
    body: fd
  });

  alert("Uploaded");
  getFiles();
}

// GET FILES
async function getFiles() {
  const res = await fetch(baseURL + "/files");
  const files = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  files.forEach(f => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="${baseURL}/view/${f.filename}" target="_blank">${f.originalname}</a>
      <button onclick="deleteFile('${f._id}')">Delete</button>
    `;

    list.appendChild(li);
  });
}

// DELETE
async function deleteFile(id) {
  await fetch(baseURL + "/delete/" + id, { method: "DELETE" });
  getFiles();
}