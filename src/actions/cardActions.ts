import { Dispatch } from "redux";
import { ActionProps, ICard } from "../common/interfaces";
import { ADD_CARD } from "../types";

export const addCard =
  (
    taskTitle: string,
    taskDesc: string,
    taskTag: string,
    taskDueDate: string,
    taskAssignee: string
  ) =>
  (dispatch: Dispatch<ActionProps>) => {
    sessionStorage.setItem("title", taskTitle);
    sessionStorage.setItem("desc", taskDesc);
    sessionStorage.setItem("tag", taskTag);
    sessionStorage.setItem("dueDate", taskDueDate);
    sessionStorage.setItem("assignee", taskAssignee);

    dispatch({
      type: ADD_CARD,
      payload: {
        taskTitle,
        taskDesc,
        taskTag,
        taskDueDate,
        taskAssignee,
      },
    });
  };
