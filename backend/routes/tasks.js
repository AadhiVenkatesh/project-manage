const express = require("express");
const Task = require("../models/Task");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, status, projectId } = req.body;
  const project = await Project.findById(projectId);
  if (project && project.owner.toString() === req.user.id) {
    const task = new Task({ title, description, status, project: projectId });
    await task.save();
    project.tasks.push(task._id);
    await project.save();
    res.status(201).json(task);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Get Tasks
router.get("/", authMiddleware, async (req, res) => {
  const { projectId } = req.query;
  const project = await Project.findById(projectId);
  if (project && project.owner.toString() === req.user.id) {
    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.findById(req.params.id);
  const project = await Project.findById(task.project);
  if (project.owner.toString() === req.user.id) {
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.json(task);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.id);
  const project = await Project.findById(task.project);
  if (project.owner.toString() === req.user.id) {
    await task.remove();
    res.send("Task deleted");
  } else {
    res.status(403).send("Not authorized");
  }
});

module.exports = router;
