import React, { useState, useEffect } from "react";

const Projects = ({ projects, addProject, removeProject }) => {
  const [projectName, setProjectName] = useState("");

  const handleAddProject = () => {
    addProject(projectName);
    setProjectName("");
  };

  return (
    <div>
      <h1>Projects</h1>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleAddProject}>Add Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.name}
            <button onClick={() => removeProject(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
