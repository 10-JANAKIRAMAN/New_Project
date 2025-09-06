import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";

export default function TaskModal({ task = null, onClose, onSave }) {
  const [form, setForm] = useState({
    id: task?.id || nanoid(),
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "low",
    dueDate: task?.dueDate || "",
    status: task?.status || "To Do",
    subtasks: task?.subtasks || [],
    attachments: task?.attachments || [],
    comments: task?.comments || [],
    recurring: task?.recurring || null,
    createdAt: task?.createdAt || new Date().toISOString()
  });

  useEffect(() => {
    // ensure unique IDs for subtasks if missing
    setForm((f) => ({
      ...f,
      subtasks: (f.subtasks || []).map((s) => (s.id ? s : { ...s, id: nanoid() }))
    }));
  }, []);

  const onSubtaskAdd = () => {
    setForm((f) => ({ ...f, subtasks: [{ id: nanoid(), text: "New subtask", done: false }, ...f.subtasks] }));
  };

  const toggleSubtask = (id) => {
    setForm((f) => ({ ...f, subtasks: f.subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s)) }));
  };

  const onAttach = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({ ...f, attachments: [{ id: nanoid(), name: file.name, data: reader.result }, ...f.attachments] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const addComment = (text) => {
    setForm((f) => ({ ...f, comments: [{ id: nanoid(), text, time: new Date().toISOString() }, ...f.comments] }));
  };

  const save = () => {
    onSave(form);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h3>{task ? "Edit Task" : "Create Task"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>

        <div className="modal-body">
          <div className="form-row">
            <span>Title *</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>

          <div className="form-row">
            <span>Description</span>
            <ReactQuill theme="snow" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          </div>

          <div className="form-grid">
            <label>
              <span>Priority</span>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label>
              <span>Due date</span>
              <input type="date" value={form.dueDate || ""} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </label>
          </div>

          <div>
            <h4>Subtasks</h4>
            <button className="add-task-btn" onClick={onSubtaskAdd}>+ Add subtask</button>
            <ul>
              {form.subtasks.map((s) => (
                <li key={s.id}>
                  <input type="checkbox" checked={s.done} onChange={() => toggleSubtask(s.id)} /> &nbsp;
                  <input value={s.text} onChange={(e) => setForm({ ...form, subtasks: form.subtasks.map(x => x.id === s.id ? { ...x, text: e.target.value } : x) })} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Attachments</h4>
            <input type="file" multiple onChange={onAttach} />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {form.attachments.map((a) => (
                <div key={a.id} style={{ width: 80 }}>
                  {a.data?.startsWith("data:image") ? <img src={a.data} alt={a.name} style={{ width: "100%", borderRadius: 6 }} /> : <div style={{ padding: 8, background: "#f1f1f1", borderRadius: 6 }}>{a.name}</div>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4>Comments</h4>
            <CommentBox comments={form.comments} onAdd={(txt) => addComment(txt)} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button className="btn muted" onClick={onClose}>Cancel</button>
            <button className="btn primary" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentBox({ comments = [], onAdd }) {
  const [text, setText] = useState("");
  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add comment..." style={{ flex: 1 }} />
        <button className="btn primary" onClick={() => { if (text.trim()) { onAdd(text.trim()); setText(""); } }}>Add</button>
      </div>
      <ul style={{ marginTop: 8 }}>
        {comments.map((c) => (
          <li key={c.id}><strong>{new Date(c.time).toLocaleString()}</strong>: {c.text}</li>
        ))}
      </ul>
    </div>
  );
}
