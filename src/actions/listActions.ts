import { Dispatch } from "redux";
import { FetchListsProps, ListActionProps } from "../common/interfaces";
import { ADD_LIST, FETCH_LISTS } from "../types";

export const addList =
  (listTitle: string) => (dispatch: Dispatch<ListActionProps>) => {
    let id = Math.floor(Math.random() * 100);
    sessionStorage.setItem("listTitle" + id, listTitle);
    dispatch({
      type: ADD_LIST,
      payload: {
        listTitle,
      },
    });
  };

export const fetchListItems = () => (dispatch: Dispatch<FetchListsProps>) => {
  let listItems = [];
  for (var key in sessionStorage) {
    if (key.toString().includes("listTitle")) {
      let listName: string = sessionStorage.getItem(key) || "";
      listItems.push({ listTitle: listName });
    }
  }
  dispatch({
    type: FETCH_LISTS,
    payload: listItems,
  });
};
