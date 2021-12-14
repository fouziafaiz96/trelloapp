import { Card, Col, Tag } from "antd";
import { useDrag } from "react-dnd";
import { ICard, ItemType } from "../common/interfaces";

interface IProps {
  card: ICard;
}
const TrelloCard: React.FC<IProps> = ({ card }: IProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: card,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const tagColor = (tag: string) => {
    let toLower: string = tag.toLowerCase();
    if (toLower == "bug") return "red";
    else if (toLower == "feature") return "green";
    else return "blue";
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
        ref={drag}
      >
        <Card title={card.taskTitle} style={{ margin: 12 }}>
          <p>
            <b>Description: </b>
            {card.taskDesc}
          </p>
          <p>
            <b>Assignee: </b>
            {card.taskAssignee}
          </p>
          <p>
            <b>Due Date: </b>
            {card.taskDueDate}
          </p>
          <p>
            <Tag color={tagColor(card.taskTag)}>
              {card.taskTag.toUpperCase()}
            </Tag>
          </p>
        </Card>
      </div>
    </>
  );
};

export { TrelloCard };
