import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [authenticated, setAuthenticated] = useState(true);

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

  const createProject = () => {
    axios
      .post("http://localhost:8000/api/projects", {
        name: projectName,
      })
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]);
        setProjectName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout")
      .then(() => {
        localStorage.removeItem("user");

        setAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div>
      <h1>Projects</h1>
      {authenticated ? (
        <div>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button onClick={createProject}>Create Project</button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to view projects.</p>
      )}
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
