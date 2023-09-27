import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      // Token is not present, so user is not authenticated
      setAuthenticated(false);
      navigate("/"); // Redirect to the login page
    } else {
      // Token is present, you may want to check its expiration here if needed
      setAuthenticated(true);

      // Fetch projects only if authenticated
      axios
        .get("http://localhost:8000/api/projects/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  const deleteProject = (projectId) => {
    console.log("Deleting project with ID:", projectId);
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

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  console.log(userId);
  console.log(token);

  const createProject = () => {
    axios
      .post(
        "http://localhost:8000/api/projects",
        {
          name: projectName,
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
        setProjectName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        // Clear both the user and token from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
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
