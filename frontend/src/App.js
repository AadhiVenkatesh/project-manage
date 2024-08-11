import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import { login, register } from "./services/auth";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "./services/projects";
import { createTask, getTasks, updateTask, deleteTask } from "./services/tasks";

const App = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");

  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      setUser(username);
      setToken(data.token);
    } catch (error) {
      console.error("Login failed");
    }
  };

  const handleRegister = async (username, password) => {
    try {
      await register(username, password);
      handleLogin(username, password);
    } catch (error) {
      console.error("Registration failed");
    }
  };

  const fetchProjects = async () => {
    if (token) {
      const response = await getProjects(token);
      setProjects(response.data);
    }
  };

  const fetchTasks = async (projectId) => {
    if (token) {
      const response = await getTasks(token, projectId);
      setTasks(response.data);
    }
  };

  const addProject = async (name) => {
    if (token) {
      await createProject(token, name);
      fetchProjects();
    }
  };

  const removeProject = async (id) => {
    if (token) {
      await deleteProject(token, id);
      fetchProjects();
    }
  };

  const addTask = async (title, description, status, projectId) => {
    if (token) {
      await createTask(token, title, description, status, projectId);
      fetchTasks(projectId);
    }
  };

  const removeTask = async (id, projectId) => {
    if (token) {
      await deleteTask(token, id);
      fetchTasks(projectId);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {user && (
            <>
              <Link to="/projects">Projects</Link>
              <Link to="/tasks">Tasks</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Home onRegister={handleRegister} onLogin={handleLogin} />}
          />
          <Route
            path="/projects"
            element={
              <Projects
                projects={projects}
                addProject={addProject}
                removeProject={removeProject}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
                fetchTasks={fetchTasks}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
