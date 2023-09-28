import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectNames, setProjectNames] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setAuthenticated(false);
      navigate("/");
    } else {
      setAuthenticated(true);
      axios
        .get("http://localhost:8000/api/projects/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setProjects(response.data);
          // Initialize projectNames state with project names
          const initialProjectNames = {};
          response.data.forEach((project) => {
            initialProjectNames[project.id] = project.name;
          });
          setProjectNames(initialProjectNames);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate, token]);

  const deleteProject = (projectId) => {
    axios
      .delete(`http://localhost:8000/api/projects/${projectId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateProjectName = (projectId) => {
    const projectNameToUpdate = projectNames[projectId];

    axios
      .put(
        `http://localhost:8000/api/projects/${projectId}`,
        {
          name: projectNameToUpdate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId
              ? { ...project, name: projectNameToUpdate }
              : project
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const handleLogout = () => {
    // ...
  };

  const createProject = () => {
    axios
      .post(
        "http://localhost:8000/api/projects",
        {
          name: projectNames.newProject, // Use the appropriate key for the input field
          user_id: userId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]);
        // Clear the input field by resetting its value
        setProjectNames((prevProjectNames) => ({
          ...prevProjectNames,
          newProject: "",
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Projects</h1>
      {authenticated ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to view projects.</p>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
            <input
              type="text"
              placeholder="New Project Name"
              value={projectNames[project.id] || ""}
              onChange={(e) => {
                const updatedProjectNames = { ...projectNames };
                updatedProjectNames[project.id] = e.target.value;
                setProjectNames(updatedProjectNames);
              }}
            />
            <button onClick={() => updateProjectName(project.id)}>
              Update Name
            </button>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Project Name"
        value={projectNames.newProject || ""}
        onChange={(e) => {
          setProjectNames({ ...projectNames, newProject: e.target.value });
        }}
      />
      <button onClick={createProject}>Create Project</button>
    </div>
  );
}

export default ProjectList;
