import { getCardObject } from "../utils/fetchUtil";
export interface ICard {
  taskTitle: string;
  taskDesc: string;
  taskTag: string;
  taskDueDate: string;
  taskAssignee: string;
}
export interface Store {
  cards: ICard[];
  newCard: string;
}
export interface IList {
  listTitle: string;
}

export interface IListObject {
  lists: IList[];
  newList: string;
}

export interface ActionProps {
  type: string;
  payload: ICard;
}

export interface ListActionProps {
  type: string;
  payload: {
    listTitle: string;
  };
}

export interface cardApiObject<T> {
  data: T;
  isFetching: boolean;
}

export interface IList {
  listTitle: string;
}
