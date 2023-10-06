// projectReducer.ts

import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE, // Add DELETE_PROJECT_FAILURE
  UPDATE_PROJECT_NAME_SUCCESS,
  UPDATE_PROJECT_NAME_FAILURE, // Add UPDATE_PROJECT_NAME_FAILURE
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE, // Add CREATE_PROJECT_FAILURE
  ProjectActionTypes,
} from "./projectActions";

interface ProjectState {
  projects: Project[];
  error: Error | null;
}

const initialState: ProjectState = {
  projects: [],
  error: null,
};

const projectReducer = (
  state = initialState,
  action: ProjectActionTypes
): ProjectState => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        error: null,
      };
    case FETCH_PROJECTS_FAILURE:
    case DELETE_PROJECT_SUCCESS:
    case UPDATE_PROJECT_NAME_SUCCESS:
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        error: null,
      };
    // Handle error cases
    case DELETE_PROJECT_FAILURE:
    case UPDATE_PROJECT_NAME_FAILURE:
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload, // Set the error to the payload (error object)
      };
    default:
      return state;
  }
};

export default projectReducer;
