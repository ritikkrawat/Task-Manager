import React, { useState, useEffect } from "react";
import TaskForm from "./component/taskForm";
import TaskList from "./component/taskList";
import FilterBar from "./component/filterBar";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(`${API_URL}/api/tasks`, taskData);
      setTasks([res.data, ...tasks]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/api/tasks/${id}`, updatedData);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axios.patch(`${API_URL}/api/tasks/${id}/toggle`);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      setError("Failed to toggle task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
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
      <h1>Task Manager</h1>

      {error && <p className="error">{error}</p>}

      <TaskForm onAdd={addTask} />

      <div className="task-stats">
        <span>Active: {activeCount}</span>
        <span>Completed: {completedCount}</span>
      </div>

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

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
  );
}