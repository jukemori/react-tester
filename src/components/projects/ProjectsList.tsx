import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT_NAME,
  CREATE_PROJECT,
  startEditingProject,
} from "../../redux/project/projectActions"; // Adjust the import path

import ProjectItem from "./ProjectItem";
import { RootState } from "../../redux/store";

function ProjectList() {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();

  const [projectNames, setProjectNames] = useState<{ [key: number]: string }>(
    {}
  );
  const [newProject, setNewProject] = useState<string>("");
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    dispatch({ type: FETCH_PROJECTS, payload: token }); // Corrected action type
  }, [dispatch, token]);

  const startEditingProject = (projectId: number) => {
    // Dispatch the startEditingProject action
    dispatch(startEditingProject(projectId));
  };

  const updateProject = async (projectId: number) => {
    try {
      const newName = projectNames[projectId];
      await dispatch({
        type: UPDATE_PROJECT_NAME,
        payload: { projectId, newName, token },
      }); // Corrected action type
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectById = async (projectId: number) => {
    try {
      await dispatch({ type: DELETE_PROJECT, payload: { projectId, token } }); // Corrected action type
    } catch (error) {
      console.error(error);
    }
  };

  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  const createNewProject = async () => {
    try {
      const newProjectData = {
        name: newProject,
        user_id: userId,
      };
      await dispatch({
        type: CREATE_PROJECT,
        payload: { newProjectData, token },
      }); // Corrected action type
      setNewProject("");
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
    <>
      <ul className="item__cards">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            isEditing={!!projectNames[project.id]}
            projectNames={projectNames}
            onEdit={() => startEditingProject(project.id)}
            onUpdate={updateProject}
            onDelete={deleteProjectById}
            onNameChange={handleProjectNameChange}
          />
        ))}
      </ul>
      <div className="item__create">
        <input
          className="item__input--create"
          type="text"
          placeholder="Project Name"
          value={newProject}
          onChange={(e) => {
            setNewProject(e.target.value);
          }}
        />
        <button className="button" onClick={createNewProject}>
          Create Project
        </button>
      </div>
    </>
  );
}

export default ProjectList;
