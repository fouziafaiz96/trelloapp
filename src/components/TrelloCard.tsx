import { Card, Tag } from "antd";
import { ICard } from "../common/interfaces";

interface IProps {
  card: ICard;
}
const TrelloCard: React.FC<IProps> = ({ card }: IProps) => {
  console.log("TrelloCard", card);
  const tagColor = (tag: string) => {
    console.log(tag);

    if (tag == "Bug") return "red";
    else if (tag == "Feature") return "green";
    else return "blue";
  };
  return (
    <>
      <Card title={card.taskTitle} style={{ width: 300 }}>
        <p>{card.taskDesc}</p>
        <p>{card.taskAssignee}</p>
        <p>
          <Tag color={tagColor(card.taskTag)}>{card.taskTag}</Tag>
        </p>
      </Card>
    </>
  );
};

export { TrelloCard };
