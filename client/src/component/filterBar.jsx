import React from "react";

export default function FilterBar({ filter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filter-pills">
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
  );
}