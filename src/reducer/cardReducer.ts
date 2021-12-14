import { ActionProps, ICard, Store } from "../common/interfaces";
import { ADD_CARD } from "../types";

let initialState = {
  cards: [],
};
const addCard = (cards: ICard[], newCard: any): ICard[] => [...cards, newCard];

const cardReducer = (
  state: Store = { cards: [], newCard: "" },
  action: ActionProps
) => {
  console.log(action);
  switch (action.type) {
    case ADD_CARD:
      console.log("ADD_CARD", ...state.cards, action.payload);
      return {
        ...state,
        cards: addCard(state.cards, action.payload),
        newCard: action.payload,
      };

    default:
      return state;
  }
};

export default cardReducer;
