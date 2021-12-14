import { Dispatch } from "redux";
import { ListActionProps } from "../common/interfaces";
import { ADD_LIST } from "../types";

export const addList =
  (listTitle: string) => (dispatch: Dispatch<ListActionProps>) => {
    sessionStorage.setItem("listTitle", listTitle);
    console.log("skjdbkjsb");

    dispatch({
      type: ADD_LIST,
      payload: {
        listTitle,
      },
    });
  };
