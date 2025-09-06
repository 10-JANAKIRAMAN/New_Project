import React from "react";

const StatsCards = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const today = new Date();
  const overdue = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < today &&
      t.status !== "Completed"
  ).length;

  return (
    <section className="stats-cards" aria-label="Task statistics">
      <div className="card blue" tabIndex="0">
        <h3>Total Tasks</h3>
        <p>{total}</p>
      </div>
      <div className="card green" tabIndex="0">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>
      <div className="card red" tabIndex="0">
        <h3>Overdue</h3>
        <p>{overdue}</p>
      </div>
      <div className="card purple" tabIndex="0">
        <h3>Productivity</h3>
        <p>{total > 0 ? Math.round((completed / total) * 100) : 0}%</p>
      </div>
    </section>
  );
};

export default StatsCards;
