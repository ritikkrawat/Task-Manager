import React, { useState } from "react";

export default function TaskItem({ task, onUpdate, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const handleUpdate = () => {
    if (!title.trim()) return;
    onUpdate(task.id, { title, description, dueDate });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="task-actions">
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <h3>{task.title}</h3>
      </div>

      {task.description && <p>{task.description}</p>}

      {task.dueDate && (
        <p className="due-date">
          Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
          {isOverdue && <span className="overdue-label"> — Overdue</span>}
        </p>
      )}

      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}