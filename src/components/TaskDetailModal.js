import React, { useState } from "react";

const TaskDetailModal = ({ task, onClose, onAddComment, onUploadAttachment }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onAddComment(task.id, { text: comment, time: new Date().toISOString() });
      setComment("");
    }
  };

  const handleFileChange = (e) => {
    onUploadAttachment(task.id, e.target.files);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h3>{task.title}</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </header>

        <div className="modal-body">
          <h4>Attachments</h4>
          <input type="file" multiple onChange={handleFileChange} />
          <div className="attachment-previews">
            {task.attachments?.map((file, i) => (
              <img key={i} src={file.previewUrl || URL.createObjectURL(file)} alt="preview" width={60} style={{ margin: 4, borderRadius: 4 }} />
            ))}
          </div>

          <h4>Comments</h4>
          <ul className="comment-list">
            {(task.comments || []).map((c, i) => (
              <li key={i}>
                <p>{c.text}</p>
                <small>{new Date(c.time).toLocaleString()}</small>
              </li>
            ))}
          </ul>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            rows={3}
            style={{ width: "100%", padding: 6, borderRadius: 6, border: "1px solid #ccc", marginBottom: 4 }}
          />
          <button onClick={handleCommentSubmit} className="btn primary" style={{ padding: "0.4rem 0.8rem" }}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
