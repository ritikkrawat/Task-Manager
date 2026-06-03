import React from "react";

export default function FilterBar({ filter, onFilterChange, search, onSearchChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}