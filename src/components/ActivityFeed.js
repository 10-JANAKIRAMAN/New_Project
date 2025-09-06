import React, { useState, useEffect } from "react";

const ActivityFeed = ({ activity = [] }) => {
  const [activities, setActivities] = useState(activity);
  const [deleted, setDeleted] = useState(null);

  // Animate item removal smoothly before deleting from state
  const handleDelete = (index) => {
    // Store deleted item for undo
    setDeleted({ item: activities[index], index });
    // Fade out animation by adding class
    const elem = document.getElementById(`activity-${index}`);
    if (elem) {
      elem.style.opacity = "0";
      setTimeout(() => {
        setActivities((prev) => prev.filter((_, i) => i !== index));
      }, 300);
    } else {
      // Fallback delete
      setActivities((prev) => prev.filter((_, i) => i !== index));
    }
  };
  //

  // Undo deletion
  const handleUndo = () => {
    if (deleted) {
      setActivities((prev) => {
        const newActivities = [...prev];
        newActivities.splice(deleted.index, 0, deleted.item);
        return newActivities;
      });
      setDeleted(null);
    }
  };

  // Like toggle in activity item
  const toggleLike = (index) => {
    setActivities((prev) =>
      prev.map((act, i) =>
        i === index ? { ...act, liked: !act.liked } : act
      )
    );
  };

  return (
    <div
      className="activity-feed"
      style={{
        maxWidth: 400,
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
    >
      <h3 style={{ borderBottom: "1px solid #ccc", paddingBottom: 8 }}>
        Recent Activity
      </h3>

      {activities.length === 0 && (
        <p style={{ fontStyle: "italic", color: "#666" }}>No activity yet.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {activities.map((a, i) => (
          <li
            key={i}
            id={`activity-${i}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9f9f9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div>
              <span>{a.msg}</span>{" "}
              <small style={{ color: "#888", fontSize: "0.85em" }}>
                ({a.time})
              </small>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => toggleLike(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: a.liked ? "#1976d2" : "#aaa",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  marginRight: 10,
                }}
                aria-label={a.liked ? "Unlike" : "Like"}
                title={a.liked ? "Unlike" : "Like"}
              >
                ♥
              </button>

              <button
                onClick={() => handleDelete(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#f44336",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                }}
                aria-label="Delete activity"
                title="Delete activity"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleted && (
        <div
          style={{
            marginTop: 12,
            padding: 10,
            backgroundColor: "#fff3e0",
            border: "1px solid #ffcc80",
            borderRadius: 4,
            maxWidth: 400,
            margin: "12px auto 0",
            textAlign: "center",
          }}
        >
          <span>
            Activity deleted.{" "}
            <button
              onClick={handleUndo}
              style={{
                cursor: "pointer",
                color: "#1976d2",
                background: "none",
                border: "none",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Undo
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
