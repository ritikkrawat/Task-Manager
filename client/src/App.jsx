import React, { useState, useEffect } from "react";
import TaskForm from "./component/taskForm";
import TaskList from "./component/taskList";
import FilterBar from "./component/filterBar";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(`${API_URL}/api/tasks`, taskData);
      setTasks([res.data, ...tasks]);
      toast.success("Task added");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/api/tasks/${id}`, updatedData);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      toast.success("Task updated");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axios.patch(`${API_URL}/api/tasks/${id}/toggle`);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      toast.success(res.data.completed ? "Task completed" : "Task marked active");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesFilter =
      filter === "active" ? !t.completed :
      filter === "completed" ? t.completed : true;

    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="header">
        <h1>Task Manager</h1>
        <p>Manage your tasks, stay on top of deadlines.</p>
      </div>

      <div className="layout">
        <div className="left-panel">
          <div className="card">
            <TaskForm onAdd={addTask} />
          </div>
        </div>

        <div className="right-panel">
          <div className="stats">
            <div className="stat">
              <div className="stat-label">Active tasks</div>
              <div className="stat-value">{activeCount}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Completed</div>
              <div className="stat-value">{completedCount}</div>
            </div>
          </div>

          <div className="toolbar">
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FilterBar filter={filter} onFilterChange={setFilter} />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty">No tasks found.</p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onUpdate={updateTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}