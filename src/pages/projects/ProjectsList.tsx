import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProjects,
  deleteProject,
  updateProjectName,
  createProject,
} from "../../api/projectApi"; // Import the API functions
import ProjectItem from "./ProjectItem"; // Import the ProjectItem component

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectNames, setProjectNames] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const [editMode, setEditMode] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setAuthenticated(false);
          navigate("/");
        } else {
          setAuthenticated(true);
          const response = await fetchProjects(token);
          setProjects(response);
          const initialProjectNames = {};
          response.forEach((project) => {
            initialProjectNames[project.id] = project.name;
          });
          setProjectNames(initialProjectNames);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/"); // Redirect to the login page or another appropriate route
  };

  const startEditingProject = (projectId) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [projectId]: true }));
  };

  const updateProject = async (projectId) => {
    try {
      const newName = projectNames[projectId];
      const updatedProject = await updateProjectName(projectId, newName, token);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, name: updatedProject.name }
            : project
        )
      );
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [projectId]: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectById = async (projectId) => {
    try {
      await deleteProject(projectId, token);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const user = localStorage.getItem("user");
  const userId = user.id;

  const createNewProject = async () => {
    try {
      const newProjectData = {
        name: projectNames.newProject,
        user_id: userId, // Make sure userId is defined
      };
      const createdProject = await createProject(newProjectData, token);
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      setProjectNames((prevProjectNames) => ({
        ...prevProjectNames,
        newProject: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectNameChange = (projectId, newName) => {
    setProjectNames((prevProjectNames) => ({
      ...prevProjectNames,
      [projectId]: newName,
    }));
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
          <ProjectItem
            key={project.id}
            project={project}
            authenticated={authenticated} // Pass the authenticated prop here
            isEditing={editMode[project.id]}
            projectNames={projectNames}
            onEdit={startEditingProject}
            onUpdate={updateProject}
            onDelete={deleteProjectById}
            onNameChange={handleProjectNameChange}
          />
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
      <button onClick={createNewProject}>Create Project</button>
    </div>
  );
}

export default ProjectList;
