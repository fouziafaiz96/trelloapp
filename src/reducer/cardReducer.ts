import { ActionProps, ICard, Store } from "../common/interfaces";
import { ADD_CARD, DELETE_CARD, FETCH_CARDS } from "../types";

let initialState = {
  cards: [],
};
const addCard = (cards: ICard[], newCard: any): ICard[] => [...cards, newCard];
const removeCard = (cards: ICard[], prevCard: any) => {
  let index = cards.findIndex((item) => item.taskId == prevCard.taskId);
  let removedArray = cards.splice(index, 1);
  return [...cards];
};

const cardReducer = (
  state: Store = { cards: [], newCard: "" },
  action: ActionProps
) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: addCard(state.cards, action.payload),
        newCard: action.payload,
      };
    case FETCH_CARDS:
      return {
        ...state,
        cards: action.payload,
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: removeCard(state.cards, action.payload),
      };
    default:
      return state;
  }
};

export default cardReducer;
