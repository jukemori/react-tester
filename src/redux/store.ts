// store.ts

import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { projectSagas } from "./project/projectSagas";
import projectReducer from "./project/projectReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  // Add other reducers for users, tests, codes, etc. here
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(projectSagas);

export default store;
