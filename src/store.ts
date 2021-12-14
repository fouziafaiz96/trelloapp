import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer/rootReducer";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunkMiddleware)
);
