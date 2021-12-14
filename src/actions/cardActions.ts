import { parse } from "path";
import { Dispatch } from "redux";
import { ActionProps, FetchCardsProps, ICard } from "../common/interfaces";
import { ADD_CARD, DELETE_CARD, FETCH_CARDS } from "../types";

export const addCard =
  (
    taskId: number,
    taskTitle: string,
    taskDesc: string,
    taskTag: string,
    taskDueDate: string,
    taskAssignee: string
  ) =>
  (dispatch: Dispatch<ActionProps>) => {
    let cardObjId = Math.floor(Math.random() * 100);
    let cardObj = {
      taskId: cardObjId,
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      taskTag: taskTag,
      taskDueDate: taskDueDate,
      taskAssignee: taskAssignee,
    };
    sessionStorage.setItem("cardObj" + cardObjId, JSON.stringify(cardObj));

    dispatch({
      type: ADD_CARD,
      payload: {
        taskId: cardObjId,
        taskTitle,
        taskDesc,
        taskTag,
        taskDueDate,
        taskAssignee,
      },
    });
  };

export const updateCard = (card: any) => (dispatch: Dispatch<ActionProps>) => {
  let changedObj: ICard = getCardbyId(card.taskId);
  dispatch({
    type: DELETE_CARD,
    payload: {
      taskId: card.taskId,
      taskTitle: card.taskTitle,
      taskDesc: card.taskDesc,
      taskTag: card.taskTag,
      taskDueDate: card.taskDueDate,
      taskAssignee: card.taskAssignee,
    },
  });

  sessionStorage.removeItem("cardObj" + card.taskId.toString());
  let taskId = changedObj.taskId;

  let newcardObj = {
    taskId: changedObj.taskId,
    taskTitle: changedObj.taskTitle,
    taskDesc: changedObj.taskDesc,
    taskTag: "bug",
    taskDueDate: changedObj.taskDueDate,
    taskAssignee: changedObj.taskAssignee,
  };

  sessionStorage.setItem("cardObj" + taskId, JSON.stringify(newcardObj));
  dispatch({
    type: ADD_CARD,
    payload: newcardObj,
  });
};

function getCardbyId(id: number) {
  for (var key in sessionStorage) {
    if (key.toString().includes("cardObj")) {
      let allCards = sessionStorage.getItem(key);
      if (allCards) {
        let parsedObj = JSON.parse(allCards);
        if (parsedObj.taskId == id) return parsedObj;
      }
    }
  }
}

export const fetchCardItems = () => (dispatch: Dispatch<FetchCardsProps>) => {
  let cardItems: ICard[] = [];
  for (var key in sessionStorage) {
    if (key.toString().includes("cardObj")) {
      let card: string = sessionStorage.getItem(key) || "";
      cardItems.push(JSON.parse(card));
    }
  }
  dispatch({
    type: FETCH_CARDS,
    payload: cardItems,
  });
  // return cardItems;
};
