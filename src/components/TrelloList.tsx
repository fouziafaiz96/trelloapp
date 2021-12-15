import { TrelloCard } from "./TrelloCard";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { ICard, IList, ItemType } from "../common/interfaces";
import { connect } from "react-redux";
import { fetchCardItems, updateCard } from "../actions/cardActions";
import { addList } from "../actions/listActions";
import { useDrop } from "react-dnd";

interface IProps {
  cardsData: [];
  listsData: [];
  list: IList;
  updateCard: (card: ICard, newStatus: string) => void;
  fetchCardItems: () => void;
  onDrop: (item: ICard, monitor: any, status: string) => void;
}
const TrelloList: React.FC<IProps> = ({
  cardsData,
  list,
  updateCard,
  fetchCardItems,
  onDrop,
}) => {
  const [, drop] = useDrop({
    accept: ItemType.CARD,
    canDrop: (item: ICard, monitor) => {
      return true;
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, list.listTitle);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
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
        <Row style={{ width: "100%" }} ref={drop}>
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => {
              return (
                card.taskTag.toLowerCase() === list.listTitle.toLowerCase() && (
                  <TrelloCard
                    // moveItem={moveItem}
                    card={card}
                    key={`${index}${card.taskTitle}`}
                    index={index}
                  />
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
    updateCard: (card: ICard, newStatus: string) =>
      dispatch(updateCard(card, newStatus)),
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
