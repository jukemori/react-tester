import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects/")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteProject = (projectId) => {
    console.log("Deleting project with ID:", projectId);
    axios
      .delete(`http://localhost:8000/api/projects/${projectId}`)
      .then(() => {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Projects</h1>
      <Link to="http://localhost:8000/api/projects/create">Create Project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
