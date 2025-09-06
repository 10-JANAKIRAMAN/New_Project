import React from "react";

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search || ""}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", flex: 1 }}
      />
      <select
        value={filters.priority || ""}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={filters.dueDate || ""}
        onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
        style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default FilterBar;
