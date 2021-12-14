import { TrelloCard } from "./TrelloCard";
import {
  PageHeader,
  Button,
  Space,
  Modal,
  Input,
  DatePicker,
  Select,
  Tag,
  Row,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ActionProps, ICard, IList, ItemType } from "../common/interfaces";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addCard, fetchCardItems, updateCard } from "../actions/cardActions";
import { addList, fetchListItems } from "../actions/listActions";
import { useDrop } from "react-dnd";

interface IProps {
  cardsData: [];
  listsData: [];
  list: IList;
  updateCard: (card: ICard) => void;
  fetchCardItems: () => void;
}
const TrelloList: React.FC<IProps> = ({
  cardsData,
  list,
  updateCard,
  fetchCardItems,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.CARD,
    drop: (item: ICard) => changeCardItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const changeCardItem = (item: ICard) => {
    updateCard(item);
  };
  const [listModal, setListModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    fetchCardItems();
  }, []);
  useEffect(() => {
    if (cardsData.length) setCards(cardsData);
  }, [cardsData]);

  return (
    <>
      <div style={styles.container as React.CSSProperties} ref={drop}>
        <h4 style={styles.mainTitle as React.CSSProperties}>
          {list.listTitle}
        </h4>
        <Row style={{ width: "100%" }}>
          {cards &&
            cards.length &&
            cards.map((card, index) => {
              return (
                card.taskTag.toLowerCase() == list.listTitle.toLowerCase() && (
                  <TrelloCard card={card} key={`${index}${card.taskTitle}`} />
                )
              );
            })}
        </Row>
      </div>

      {/* modal to get the details of list starts here */}

      {/* modal to get the details of list ends here */}
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    cardsData: state.cardReducer.cards,
    listsData: state.listReducer.lists,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCard: (card: ICard) => dispatch(updateCard(card)),
    addList: (listTitle: string) => dispatch(addList(listTitle)),
    fetchCardItems: () => dispatch(fetchCardItems()),
  };
};

const styles = {
  container: {
    padding: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "5px",
  },
  mainTitle: {
    color: "white",
    fontSize: "20px",
    textTransform: "uppercase",
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
