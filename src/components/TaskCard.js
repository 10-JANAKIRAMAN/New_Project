import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function TaskCard({ task, openEdit, onDelete, onSave }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [descEditing, setDescEditing] = useState(false);
  const [description, setDescription] = useState(task.description || "");
  const progress = useMemo(() => {
    const total = (task.subtasks || []).length;
    if (total === 0) return 0;
    const done = task.subtasks.filter((s) => s.done).length;
    return Math.round((done / total) * 100);
  }, [task]);

  const saveTitle = () => {
    setEditingTitle(false);
    if (title !== task.title) onSave({ ...task, title });
  };

  const saveDescription = () => {
    setDescEditing(false);
    if (description !== task.description) onSave({ ...task, description });
  };

  return (
    <div className="task-card">
      <div className="task-row">
        {editingTitle ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={saveTitle} onKeyDown={(e) => e.key === "Enter" && saveTitle()} autoFocus />
        ) : (
          <h4 className="task-title" onDoubleClick={() => setEditingTitle(true)}>{task.title}</h4>
        )}

        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>

      {descEditing ? (
        <div>
          <ReactQuill theme="snow" value={description} onChange={setDescription} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
            <button className="btn muted" onClick={() => setDescEditing(false)}>Cancel</button>
            <button className="btn primary" onClick={saveDescription}>Save</button>
          </div>
        </div>
      ) : (
        <div onDoubleClick={() => setDescEditing(true)} dangerouslySetInnerHTML={{ __html: task.description || "<i>No description</i>" }} />
      )}

      <div className="task-meta">
        <div>Subtasks: {progress}%</div>
        <div>{task.dueDate ? `Due ${task.dueDate}` : ""}</div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button className="btn muted" onClick={() => openEdit && openEdit(task)}>Open</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
