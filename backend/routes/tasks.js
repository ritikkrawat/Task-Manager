const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const tasks = require("../data/store");

// GET all tasks - sorted by creation date (newest first)
router.get("/", (req, res) => {
  const sorted = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sorted);
});

// POST create a task
router.post("/", (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: description || "",
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  res.status(201).json(task);
});

// PUT update a task
router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  task.title = title.trim();
  task.description = description || "";
  task.dueDate = dueDate || null;

  res.json(task);
});

// PATCH toggle complete/incomplete
router.patch("/:id/toggle", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
});

// DELETE a task
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
});

module.exports = router;