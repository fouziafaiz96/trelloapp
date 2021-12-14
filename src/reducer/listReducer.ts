import {
  ActionProps,
  IList,
  IListObject,
  ListActionProps,
} from "../common/interfaces";
import { ADD_LIST, FETCH_LISTS } from "../types";

const addList = (lists: IList[], newList: IList) => [...lists, newList];

const listReducer = (
  state: IListObject = { lists: [], newList: "" },
  action: ListActionProps
) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: addList(state.lists, action.payload),
      };
    case FETCH_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    default:
      return state;
  }
};
export default listReducer;
