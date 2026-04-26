const express = require("express");
const router = express.Router();
const multer = require("multer");
const File = require("../models/File");

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// UPLOAD FILE
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const username = req.body.username; // 👈 IMPORTANT

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      username: username
    });

    await newFile.save();

    res.json({ message: "Uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET FILES (USER SPECIFIC)
router.get("/files/:username", async (req, res) => {
  try {
    const files = await File.find({
      username: req.params.username
    });

    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE FILE
router.delete("/delete/:id", async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;