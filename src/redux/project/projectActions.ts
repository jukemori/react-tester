// projectActions.ts

import axios, { AxiosResponse } from "axios";

// Action Types
export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";
export const UPDATE_PROJECT_NAME = "UPDATE_PROJECT_NAME";
export const UPDATE_PROJECT_NAME_SUCCESS = "UPDATE_PROJECT_NAME_SUCCESS";
export const UPDATE_PROJECT_NAME_FAILURE = "UPDATE_PROJECT_NAME_FAILURE";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";
export const START_EDITING_PROJECT = "START_EDITING_PROJECT";

// Interfaces
export interface Project {
  id: number;
  name: string;
  // Add other properties as needed
}

interface FetchProjectsAction {
  type: typeof FETCH_PROJECTS;
  payload: {
    token: string;
  };
}

interface FetchProjectsSuccessAction {
  type: typeof FETCH_PROJECTS_SUCCESS;
  payload: Project[];
}

interface FetchProjectsFailureAction {
  type: typeof FETCH_PROJECTS_FAILURE;
  payload: Error;
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: {
    projectId: number;
    token: string;
  };
}

interface DeleteProjectSuccessAction {
  type: typeof DELETE_PROJECT_SUCCESS;
  payload: number; // Project ID
}

interface DeleteProjectFailureAction {
  type: typeof DELETE_PROJECT_FAILURE;
  payload: Error;
}

interface UpdateProjectNameAction {
  type: typeof UPDATE_PROJECT_NAME;
  payload: {
    projectId: number;
    newName: string;
    token: string;
  };
}

interface UpdateProjectNameSuccessAction {
  type: typeof UPDATE_PROJECT_NAME_SUCCESS;
  payload: Project;
}

interface UpdateProjectNameFailureAction {
  type: typeof UPDATE_PROJECT_NAME_FAILURE;
  payload: Error;
}

interface CreateProjectAction {
  type: typeof CREATE_PROJECT;
  payload: {
    newProjectData: {
      name: string;
      user_id: number; // Assuming user_id is a number
    };
    token: string;
  };
}

interface CreateProjectSuccessAction {
  type: typeof CREATE_PROJECT_SUCCESS;
  payload: Project;
}

interface CreateProjectFailureAction {
  type: typeof CREATE_PROJECT_FAILURE;
  payload: Error;
}

interface StartEditingProjectAction {
  type: typeof START_EDITING_PROJECT;
  payload: {
    projectId: number;
  };
}

// Action creator to start editing a project
export const startEditingProject = (
  projectId: number
): StartEditingProjectAction => ({
  type: START_EDITING_PROJECT,
  payload: {
    projectId,
  },
});

// Action creators for other actions
export function fetchProjects(token: string): FetchProjectsAction {
  return {
    type: FETCH_PROJECTS,
    payload: {
      token,
    },
  };
}

export function fetchProjectsSuccess(
  projects: Project[]
): FetchProjectsSuccessAction {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: projects,
  };
}

export function fetchProjectsFailure(error: Error): FetchProjectsFailureAction {
  return {
    type: FETCH_PROJECTS_FAILURE,
    payload: error,
  };
}

export function createProjectFailure(error: any) {
  return {
    type: CREATE_PROJECT_FAILURE,
    payload: error,
  };
}

export function createProjectSuccess(project: Project) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: project,
  };
}

// Action creator for deleting a project success
export function deleteProjectSuccess(projectId: number) {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: projectId,
  };
}

// Action creator for deleting a project failure
export function deleteProjectFailure(error: Error) {
  return {
    type: DELETE_PROJECT_FAILURE,
    payload: error,
  };
}

// Action creator for updating a project name success
export function updateProjectNameSuccess(project: Project) {
  return {
    type: UPDATE_PROJECT_NAME_SUCCESS,
    payload: project,
  };
}

// Action creator for updating a project name failure
export function updateProjectNameFailure(error: Error) {
  return {
    type: UPDATE_PROJECT_NAME_FAILURE,
    payload: error,
  };
}

// Define action creators for DELETE_PROJECT, UPDATE_PROJECT_NAME, and CREATE_PROJECT similarly

export type ProjectActionTypes =
  | FetchProjectsAction
  | FetchProjectsSuccessAction
  | FetchProjectsFailureAction
  | DeleteProjectAction
  | DeleteProjectSuccessAction
  | DeleteProjectFailureAction
  | UpdateProjectNameAction
  | UpdateProjectNameSuccessAction
  | UpdateProjectNameFailureAction
  | CreateProjectAction
  | CreateProjectSuccessAction
  | CreateProjectFailureAction
  | StartEditingProjectAction;
