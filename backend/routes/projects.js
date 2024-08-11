const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Project
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const project = new Project({ name, owner: req.user.id });
  await project.save();
  res.status(201).json(project);
});

// Get Projects
router.get("/", authMiddleware, async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.json(projects);
});

// Update Project
router.put("/:id", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const project = await Project.findById(req.params.id);
  if (project.owner.toString() === req.user.id) {
    project.name = name;
    await project.save();
    res.json(project);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Delete Project
router.delete("/:id", authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.owner.toString() === req.user.id) {
    await project.remove();
    res.send("Project deleted");
  } else {
    res.status(403).send("Not authorized");
  }
});

module.exports = router;
