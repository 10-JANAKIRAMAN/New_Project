import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarWidget = ({ tasks, setTasks, addActivity }) => {
  const [date, setDate] = useState(new Date());
  const [taskForDate, setTaskForDate] = useState("");
  const [tasksByDate, setTasksByDate] = useState({});

  useEffect(() => {
    const grouped = tasks.reduce((acc, task) => {
      const key = new Date(task.dueDate || task.date || task.createdAt).toDateString();
      acc[key] = acc[key] ? [...acc[key], task] : [task];
      return acc;
    }, {});
    setTasksByDate(grouped);
  }, [tasks]);

  const onAddTask = () => {
    if (!taskForDate.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskForDate,
      description: "",
      priority: "low",
      dueDate: date.toISOString(),
      status: "To Do",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    addActivity(`Added task "${taskForDate}" on ${date.toDateString()}`);
    setTaskForDate("");
  };

  return (
    <div className="calendar-widget">
      <h3>Calendar</h3>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date: d }) =>
          tasksByDate[d.toDateString()] ? "has-task" : null
        }
      />
      <div style={{ marginTop: "1rem" }}>
        <h4>Tasks for {date.toDateString()}</h4>
        <ul>
          {(tasksByDate[date.toDateString()] || []).map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
        <input
          type="text"
          value={taskForDate}
          onChange={(e) => setTaskForDate(e.target.value)}
          placeholder="Add a task for this date"
          aria-label="Task title input"
          onKeyDown={(e) => {
            if (e.key === "Enter") onAddTask();
          }}
        />
        <button
          onClick={onAddTask}
          disabled={!taskForDate.trim()}
          aria-label="Add task button"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default CalendarWidget;
