// store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import eventsReducer from "./events";
import modalReducer from "./modal";
import errorsReducer from "./errors";
import tasksReducer from "./tasks";

const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventsReducer,
  errors: errorsReducer,
  modalReducer,
  tasks: tasksReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
