import React, { useState } from "react";
import {
  FaPlus,
  FaStickyNote,
  FaFolder,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ projects = [] }) => {
  const [activeProject, setActiveProject] = useState(
    projects.length > 0 ? projects[0].name : ""
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Collapse Button */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Top Action Buttons */}
      <div className="actions">
        <button className="action-btn primary">
          <FaPlus />
          {!collapsed && <span>New Task</span>}
        </button>
        <button className="action-btn">
          <FaFolder />
          {!collapsed && <span>New Project</span>}
        </button>
        <button className="action-btn">
          <FaStickyNote />
          {!collapsed && <span>Quick Note</span>}
        </button>
      </div>

      {/* Project List */}
      <div className="projects">
        {!collapsed && <h4 className="section-title">Projects</h4>}
        <ul>
          {projects.map((p) => (
            <li
              key={p.name}
              className={p.name === activeProject ? "active" : ""}
              aria-current={p.name === activeProject ? "page" : undefined}
              tabIndex={0}
              role="button"
              onClick={() => setActiveProject(p.name)}
              onKeyDown={(e) => e.key === "Enter" && setActiveProject(p.name)}
            >
              <span
                className="color-dot"
                style={{ backgroundColor: p.color }}
              ></span>
              {!collapsed && <span className="project-name">{p.name}</span>}
              <span className="badge">{p.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        {!collapsed && (
          <>
            <h4 className="section-title">Quick Stats</h4>
            <div className="stats">
              <p>📅 Tasks Due: <strong>4</strong></p>
              <p>⭐ Starred: <strong>2</strong></p>
            </div>
            <div className="mini-calendar">
              <span>📆 Sep 2025</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
