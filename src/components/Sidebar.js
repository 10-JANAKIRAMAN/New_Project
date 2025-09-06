import React, { useState } from "react";
import { FaPlus, FaStickyNote, FaFolder } from "react-icons/fa";

const projects = [
  { name: "Website Redesign", count: 5 },
  { name: "Marketing Campaign", count: 3 },
  { name: "Personal Goals", count: 2 },
];

const Sidebar = () => {
  const [activeProject, setActiveProject] = useState(projects[0].name);

  return (
    <aside className="sidebar" role="navigation" aria-label="Main sidebar">
      <div className="actions">
        <button type="button">
          <FaPlus aria-hidden="true" /> Task
        </button>
        <button type="button">
          <FaFolder aria-hidden="true" /> Project
        </button>
        <button type="button">
          <FaStickyNote aria-hidden="true" /> Note
        </button>
      </div>
      <div className="projects">
        <h4>Projects</h4>
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
              {p.name} <span className="badge">{p.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
