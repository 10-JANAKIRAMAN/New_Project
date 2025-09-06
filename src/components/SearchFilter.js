import React from "react";

export default function SearchFilter({ filters, setFilters }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <select
        value={filters.priority || ""}
        onChange={(e) => setFilters((p) => ({ ...p, priority: e.target.value || undefined }))}
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={filters.due || ""}
        onChange={(e) => setFilters((p) => ({ ...p, due: e.target.value || undefined }))}
      >
        <option value="">All due</option>
        <option value="overdue">Overdue</option>
      </select>

      <button className="add-task-btn" onClick={() => setFilters({})}>Reset</button>
    </div>
  );
}
