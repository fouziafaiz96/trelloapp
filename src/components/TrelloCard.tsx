import { Card, Tag } from "antd";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ICard, ItemType } from "../common/interfaces";

interface IProps {
  card: ICard;
  index: number;
  // moveItem: (item: any, dragIndex: number, hoverIndex: number) => void;
}
const TrelloCard: React.FC<IProps> = ({ card, index }: IProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { type: ItemType.CARD, ...card, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemType.CARD,
  });

  drag(drop(ref));

  const tagColor = (tag: string) => {
    let toLower: string = tag.toLowerCase();
    if (toLower === "bug") return "red";
    else if (toLower === "feature") return "green";
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
        ref={ref}
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
