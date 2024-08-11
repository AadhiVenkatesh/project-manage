import React, { useState, useEffect } from "react";

const Tasks = ({ tasks, addTask, removeTask, fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId);
    }
  }, [projectId, fetchTasks]);

  const handleAddTask = () => {
    addTask(title, description, status, projectId);
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
        <option value="">Select Project</option>
        {/* Projects should be populated dynamically */}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            <button onClick={() => removeTask(task._id, task.project)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
