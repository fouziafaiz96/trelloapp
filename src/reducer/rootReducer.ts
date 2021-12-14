import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import listReducer from "./listReducer";
const rootReducer = combineReducers({
  cardReducer,
  listReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
