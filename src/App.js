import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import TaskBoard from "./components/TaskBoard";
import CalendarWidget from "./components/CalendarWidget";
import ActivityFeed from "./components/ActivityFeed";
import FilterBar from "./components/FilterBar";
import { loadData, saveData } from "./utils/localStorage";
import "./App.css";

function App() {
  // Tasks, activity & filters state
  const [tasks, setTasks] = useState(() => loadData("tasks", []));
  const [activity, setActivity] = useState(() => loadData("activity", []));
  const [filters, setFilters] = useState({});

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // Persist tasks & activity
  useEffect(() => {
    saveData("tasks", tasks);
    saveData("activity", activity);
  }, [tasks, activity]);

  // Add activity message
  const addActivity = (msg) => {
    setActivity([{ msg, time: new Date().toLocaleString() }, ...activity]);
  };

  // Overdue task alert every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const overdueTasks = tasks.filter(
        (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
      );
      if (overdueTasks.length > 0) {
        alert(`You have ${overdueTasks.length} overdue task(s)!`);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.dueDate && task.dueDate !== filters.dueDate) return false;
    return true;
  });

  return (
    <div className="app">
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <StatsCards tasks={tasks} />
          <FilterBar filters={filters} setFilters={setFilters} />
          <TaskBoard tasks={filteredTasks} setTasks={setTasks} addActivity={addActivity} />
          <div className="widgets">
            <CalendarWidget tasks={tasks} />
            <ActivityFeed activity={activity} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
