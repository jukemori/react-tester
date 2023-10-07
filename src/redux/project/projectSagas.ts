// projectSagas.ts

import { takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT_NAME,
  CREATE_PROJECT,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  deleteProjectSuccess,
  deleteProjectFailure,
  updateProjectNameSuccess,
  updateProjectNameFailure,
  createProjectSuccess,
  createProjectFailure,
  ProjectActionTypes,
} from "./projectActions";

const API_BASE_URL = "http://localhost:8000/api/projects/";

// Saga for fetching projects
function* fetchProjectsSaga(action: ProjectActionTypes) {
  try {
    const response: AxiosResponse<Project[]> = yield call(
      axios.get,
      API_BASE_URL,
      {
        headers: {
          Authorization:
            "Bearer " + (action.payload as { token: string }).token,
        },
      }
    );
    yield put(fetchProjectsSuccess(response.data));
  } catch (error) {
    yield put(fetchProjectsFailure(error));
  }
}

// Saga for deleting a project
function* deleteProjectSaga(action: ProjectActionTypes) {
  console.log("Action in deleteProjectsSaga:", action);
  console.log("Token:", action.payload.token);
  try {
    yield call(axios.delete, `${API_BASE_URL}${action.payload.projectId}`, {
      headers: {
        Authorization: "Bearer " + action.payload.token,
      },
    });
    yield put(deleteProjectSuccess(action.payload.projectId));
  } catch (error) {
    yield put(deleteProjectFailure(error));
  }
}

// Saga for updating a project name
function* updateProjectNameSaga(action: ProjectActionTypes) {
  try {
    const response: AxiosResponse<Project> = yield call(
      axios.put,
      `${API_BASE_URL}${action.payload.projectId}`,
      {
        name: action.payload.newName,
      },
      {
        headers: {
          Authorization: "Bearer " + action.payload.token,
        },
      }
    );
    yield put(updateProjectNameSuccess(response.data));
  } catch (error) {
    yield put(updateProjectNameFailure(error));
  }
}

// Saga for creating a project
function* createProjectSaga(action: ProjectActionTypes) {
  try {
    const response: AxiosResponse<Project> = yield call(
      axios.post,
      API_BASE_URL,
      action.payload.newProjectData,
      {
        headers: {
          Authorization: "Bearer " + action.payload.token,
        },
      }
    );
    yield put(createProjectSuccess(response.data));
  } catch (error) {
    yield put(createProjectFailure(error));
  }
}

// Watcher saga
export function* projectSagas() {
  yield takeLatest(FETCH_PROJECTS, fetchProjectsSaga);
  yield takeLatest(DELETE_PROJECT, deleteProjectSaga);
  yield takeLatest(UPDATE_PROJECT_NAME, updateProjectNameSaga);
  yield takeLatest(CREATE_PROJECT, createProjectSaga);
}
