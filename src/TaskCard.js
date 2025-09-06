import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TaskCard.css";

const TaskCard = ({ task, onUpdate }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description || "");
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");

  const saveTitle = () => {
    setIsEditingTitle(false);
    if (title !== task.title) updateTask({ title });
  };

  const saveDesc = () => {
    setIsEditingDesc(false);
    updateTask({ description: desc });
  };

  const updateTask = (updates) => {
    const updatedTask = { ...task, title, description: desc, subtasks, ...updates };
    onUpdate(updatedTask);
  };

  const handleDescBlur = () => saveDesc();

  const handleDescKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") saveDesc();
  };

  const toggleSubtask = (index) => {
    const updated = subtasks.map((st, i) =>
      i === index ? { ...st, completed: !st.completed } : st
    );
    setSubtasks(updated);
    updateTask({ subtasks: updated });
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    const updated = [...subtasks, { title: newSubtask, completed: false }];
    setSubtasks(updated);
    setNewSubtask("");
    updateTask({ subtasks: updated });
  };

  const progress = subtasks.length
    ? Math.round((subtasks.filter((st) => st.completed).length / subtasks.length) * 100)
    : 0;

  return (
    <div className="task-card">
      <div>
        {isEditingTitle ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === "Enter" && saveTitle()}
            autoFocus
            className="task-title-input"
          />
        ) : (
          <h4 onClick={() => setIsEditingTitle(true)}>{title}</h4>
        )}
      </div>

      <div>
        {isEditingDesc ? (
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={setDesc}
            onBlur={handleDescBlur}
            onKeyDown={handleDescKeyDown}
            placeholder="Add task description..."
          />
        ) : (
          <div
            className="task-desc"
            onClick={() => setIsEditingDesc(true)}
            dangerouslySetInnerHTML={{
              __html: desc || "<em>Click to add description</em>",
            }}
          />
        )}
      </div>

      <div className="subtasks-container">
        {subtasks.length > 0 && (
          <div className="progress-bar" aria-label={`Progress: ${progress}%`}>
            <div
              className="progress-bar-filled"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <ul className="subtask-list">
          {subtasks.map((st, i) => (
            <li key={i}>
              <label className={st.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => toggleSubtask(i)}
                />{" "}
                {st.title}
              </label>
            </li>
          ))}
        </ul>

        <div className="add-subtask">
          <input
            type="text"
            value={newSubtask}
            placeholder="New subtask..."
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSubtask()}
          />
          <button onClick={addSubtask}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
