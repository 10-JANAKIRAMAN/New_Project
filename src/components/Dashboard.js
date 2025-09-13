import React, { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaStickyNote,
  FaPaperclip,
  FaCheckCircle,
  FaPlus,
  FaFlag,
  FaEdit,
} from "react-icons/fa";
import "./App.css";

const stats = [
  { title: "Active Tasks", value: 24, change: "+8%", positive: true, color: "#2563eb" },
  { title: "Completed This Week", value: 15, goal: 20, color: "#16a34a" },
  { title: "Overdue Tasks", value: 3, color: "#dc2626" },
  { title: "Productivity", value: "7/day", change: "-5%", positive: false, color: "#f59e0b" },
];

const initialColumns = {
  "To Do": [
    {
      id: 1,
      title: "Design login page",
      description: "Create responsive design for login/signup screens",
      priority: "high",
      dueDate: "2025-09-15",
      tags: ["UI/UX", "Frontend"],
      notes: 2,
      attachments: 1,
      progress: 50,
    },
  ],
  "In Progress": [],
  "In Review": [],
  Completed: [
    {
      id: 2,
      title: "Set up CI/CD pipeline",
      description: "Automate deployment process",
      priority: "low",
      dueDate: "2025-09-10",
      tags: ["DevOps"],
      notes: 0,
      attachments: 1,
    },
  ],
};

const activityFeed = [
  { id: 1, type: "complete", text: "Completed 'Set up CI/CD pipeline'", time: "2 hours ago" },
  { id: 2, type: "add", text: "Added new task 'Design login page'", time: "4 hours ago" },
  { id: 3, type: "update", text: "Updated priority for 'API integration'", time: "Yesterday" },
];

export default function App() {
  const [columns] = useState(initialColumns);

  const formatDueDate = (date) => {
    const today = new Date();
    const due = new Date(date);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff > 1 && diff <= 7) return `In ${diff} days`;
    return due.toLocaleDateString();
  };

  const renderIcon = (type) => {
    switch (type) {
      case "complete":
        return <FaCheckCircle className="activity-icon complete" />;
      case "add":
        return <FaPlus className="activity-icon add" />;
      case "update":
        return <FaEdit className="activity-icon update" />;
      case "priority":
        return <FaFlag className="activity-icon priority" />;
      default:
        return <FaStickyNote className="activity-icon" />;
    }
  };

  return (
    <main className="dashboard">
      {/* Stats Section */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTopColor: s.color }}>
            <h4>{s.title}</h4>
            <div className="stat-value">
              <span>{s.value}</span>
              {s.change && (
                <span className={`trend ${s.positive ? "up" : "down"}`}>
                  {s.positive ? <FaArrowUp /> : <FaArrowDown />}
                  {s.change}
                </span>
              )}
            </div>
            {s.goal && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(s.value / s.goal) * 100}%`,
                    background: s.color,
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {Object.entries(columns).map(([column, tasks]) => (
          <div key={column} className="kanban-column">
            <h3>{column}</h3>
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task.id} className={`task-card priority-${task.priority}`}>
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <span className="priority-badge">{task.priority}</span>
                  </div>
                  <p className="task-desc">{task.description}</p>
                  <div className="task-meta">
                    <span className="due-date">
                      <FaClock /> {formatDueDate(task.dueDate)}
                    </span>
                    <div className="tags">
                      {task.tags.map((t, i) => (
                        <span key={i} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="task-footer">
                    <span className="icon">
                      <FaStickyNote /> {task.notes}
                    </span>
                    <span className="icon">
                      <FaPaperclip /> {task.attachments}
                    </span>
                    {task.progress !== undefined && (
                      <div className="mini-progress">
                        <div style={{ width: `${task.progress}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="activity-feed">
        <h3>Recent Activity</h3>
        <ul>
          {activityFeed.map((item) => (
            <li key={item.id} className="activity-item">
              {renderIcon(item.type)}
              <div className="activity-content">
                <p>{item.text}</p>
                <span className="activity-time">{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
