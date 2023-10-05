// projectReducer.ts

import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT_NAME_SUCCESS,
  CREATE_PROJECT_SUCCESS,
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
    default:
      return state;
  }
};

export default projectReducer;
