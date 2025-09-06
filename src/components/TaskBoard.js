import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard"; // Import the final TaskCard component

const columnsList = ["To Do", "In Progress", "In Review", "Completed"];

const TaskBoard = ({ tasks, setTasks, addActivity }) => {
  const [columns, setColumns] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalColumn, setModalColumn] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    subtasks: [],
  });

  // Organize tasks into columns whenever tasks change
  useEffect(() => {
    const grouped = {};
    columnsList.forEach((col) => {
      grouped[col] = tasks.filter((t) => t.status === col);
    });
    setColumns(grouped);
  }, [tasks]);

  // Drag & drop handler
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const startCol = source.droppableId;
    const endCol = destination.droppableId;

    if (startCol === endCol) {
      const newTasks = Array.from(columns[startCol]);
      const [moved] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, moved);
      const newCols = { ...columns, [startCol]: newTasks };
      setColumns(newCols);
      setTasks(Object.values(newCols).flat());
    } else {
      const startTasks = Array.from(columns[startCol]);
      const endTasks = Array.from(columns[endCol]);
      const [moved] = startTasks.splice(source.index, 1);
      moved.status = endCol;
      endTasks.splice(destination.index, 0, moved);

      const newCols = {
        ...columns,
        [startCol]: startTasks,
        [endCol]: endTasks,
      };
      setColumns(newCols);
      setTasks(Object.values(newCols).flat());
      addActivity(`Moved "${moved.title}" from ${startCol} → ${endCol}`);
    }
  };

  // Open modal for a particular column
  const openAddModal = (col) => {
    setModalColumn(col);
    setForm({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      subtasks: [],
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalColumn(null);
  };

  // Handle form inputs
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add task handler
  const addTask = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return alert("Please add a title for the task.");

    const newTask = {
      id: Date.now(),
      title,
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate || null,
      status: modalColumn || "To Do",
      createdAt: new Date().toISOString(),
      subtasks: [],
    };

    const newCols = { ...columns };
    newCols[newTask.status] = [newTask, ...(newCols[newTask.status] || [])];

    setColumns(newCols);
    setTasks(Object.values(newCols).flat());
    addActivity(`Created "${newTask.title}" in ${newTask.status}`);
    closeModal();
  };

  // Delete task handler
  const deleteTask = (task) => {
    const col = task.status;
    const newCols = { ...columns };
    newCols[col] = newCols[col].filter((t) => t.id !== task.id);

    setColumns(newCols);
    setTasks(Object.values(newCols).flat());
    addActivity(`Deleted "${task.title}" from ${col}`);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="taskboard">
          {columnsList.map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided, snapshot) => (
                <div
                  className={`column ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="column-header">
                    <h3>{col}</h3>
                    <button className="add-task-btn" onClick={() => openAddModal(col)}>
                      + Add Task
                    </button>
                  </div>

                  {columns[col] && columns[col].length === 0 && (
                    <div className="empty-column">No tasks here — add one.</div>
                  )}

                  {columns[col] &&
                    columns[col].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`draggable-task ${snapshot.isDragging ? "dragging" : ""}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onUpdate={(updatedTask) => {
                                const newCols = { ...columns };
                                newCols[col] = newCols[col].map((t) =>
                                  t.id === updatedTask.id ? updatedTask : t
                                );
                                setColumns(newCols);
                                setTasks(Object.values(newCols).flat());
                                addActivity(`Updated "${updatedTask.title}"`);
                              }}
                            />
                            <button
                              className="delete-btn"
                              onClick={() => deleteTask(task)}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal for adding new task */}
      {modalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <header className="modal-header">
              <h3>Create Task in “{modalColumn}”</h3>
              <button className="close-btn" onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </header>

            <form className="modal-body" onSubmit={addTask}>
              <label className="form-row">
                <span>Title *</span>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="Task title"
                  autoFocus
                />
              </label>

              <label className="form-row">
                <span>Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="A short description..."
                  rows={4}
                />
              </label>

              <div className="form-grid">
                <label>
                  <span>Priority</span>
                  <select name="priority" value={form.priority} onChange={onChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label>
                  <span>Due date</span>
                  <input name="dueDate" value={form.dueDate} onChange={onChange} type="date" />
                </label>
              </div>

              <footer className="modal-actions">
                <button type="button" className="btn muted" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Create Task
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBoard;
