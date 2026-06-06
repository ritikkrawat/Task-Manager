import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    onAdd({ title, description, dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="form-title">Add a new task</p>

      {error && <p className="error">{error}</p>}

      <div className="field">
        <label>Title *</label>
        <input
          type="text"
          placeholder="e.g. Complete project report"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          placeholder="Add more details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Due date *</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary">Add Task</button>
    </form>
  );
}