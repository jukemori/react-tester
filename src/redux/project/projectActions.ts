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

// Define other action interfaces here

export type ProjectActionTypes =
  | FetchProjectsAction
  | FetchProjectsSuccessAction
  | FetchProjectsFailureAction;
// Define other action types here
