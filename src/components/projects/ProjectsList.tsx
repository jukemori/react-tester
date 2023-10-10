import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT_NAME,
  CREATE_PROJECT,
  startEditingProject,
  endEditingProject,
} from "../../redux/project/projectActions";

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
  const editMode = useSelector((state: RootState) => state.projects.editMode);

  useEffect(() => {
    dispatch({ type: FETCH_PROJECTS, payload: { token } });
  }, [dispatch, token]);

  const startEditing = (projectId: number) => {
    // Dispatch the startEditingProject action with isEditing set to true
    dispatch(startEditingProject(projectId));
  };

  const endEditing = (projectId: number) => {
    // Dispatch the endEditingProject action with isEditing set to true
    dispatch(endEditingProject(projectId));
  };

  const updateProject = async (projectId: number) => {
    try {
      const newName = projectNames[projectId];
      await dispatch({
        type: UPDATE_PROJECT_NAME,
        payload: { projectId, newName, token },
      });
      // Set isEditing to false after updating
      endEditing(projectId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectById = async (projectId: number) => {
    try {
      await dispatch({ type: DELETE_PROJECT, payload: { projectId, token } });
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
      });
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
            isEditing={!!editMode[project.id]}
            projectNames={projectNames}
            onEdit={() => startEditing(project.id)}
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
