import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProjects,
  deleteProject,
  updateProjectName,
  createProject,
} from "../../api/projectApi";
import ProjectItem from "./ProjectItem";

interface Project {
  id: number;
  name: string;
}

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectNames, setProjectNames] = useState<{ [key: number]: string }>(
    {}
  );
  const [newProject, setNewProject] = useState<string>("");
  const [authenticated, setAuthenticated] = useState(true);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setAuthenticated(false);
          navigate("/");
        } else {
          setAuthenticated(true);
          const response: Project[] = await fetchProjects(token); // Specify the type of response
          setProjects(response);
          const initialProjectNames: { [key: number]: string } = {};
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/");
  };

  const startEditingProject = (projectId: number) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [projectId]: true }));
  };

  const updateProject = async (projectId: number) => {
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

  const deleteProjectById = async (projectId: number) => {
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
  const userId = user ? JSON.parse(user).id : null;

  const createNewProject = async () => {
    try {
      const newProjectData = {
        name: newProject, // Use the newProject state here
        user_id: userId,
      };
      const createdProject = await createProject(newProjectData, token);
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      setNewProject(""); // Reset newProject to an empty string
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectNameChange = (projectId: number, newName: string) => {
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
            authenticated={authenticated}
            isEditing={!!editMode[project.id]}
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
        value={newProject}
        onChange={(e) => {
          setNewProject(e.target.value);
        }}
      />
      <button onClick={createNewProject}>Create Project</button>
    </div>
  );
}

export default ProjectList;
