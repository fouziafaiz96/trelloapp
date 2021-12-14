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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ActionProps, ICard, IList } from "../common/interfaces";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addCard } from "../actions/cardActions";
import { addList } from "../actions/listActions";

interface IProps {
  addCard: (
    taskTitle: string,
    taskDesc: string,
    taskTag: string,
    taskDueDate: string,
    taskAssignee: string
  ) => void;
  cardsData: [];
  listsData: [];
  list: IList;
}
const TrelloList: React.FC<IProps> = ({ addCard, cardsData, list }) => {
  const [listModal, setListModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [lists, setLists] = useState<IList[]>([]);

  const { TextArea } = Input;
  const { Option } = Select;
  const tagsData = [
    {
      title: "Feature",
      color: "green",
    },
    {
      title: "Task",
      color: "blue",
    },
    {
      title: "Bug",
      color: "red",
    },
  ];
  const [state, setState] = useState<ICard>({
    taskTitle: "",
    taskDesc: "",
    taskTag: "",
    taskDueDate: "16-10-2022",
    taskAssignee: "",
  });
  const toggleListModal = () => {
    setListModal(!listModal);
  };
  const toggleCardModal = () => {
    setCardModal(!cardModal);
  };
  const handleCardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addCard(
      state.taskTitle,
      state.taskDesc,
      state.taskTag,
      state.taskDueDate,
      state.taskAssignee
    );
    toggleCardModal();
  };
  useEffect(() => {
    setCards(cardsData);
  }, [cardsData]);

  return (
    <>
      <h4>{list.listTitle}</h4>

      <Space>
        {cards.map((card) => {
          return <TrelloCard card={card} />;
        })}
      </Space>
      {/* modal to get the details of card starts here */}
      <Modal
        title="Card"
        visible={cardModal}
        onOk={handleSubmit}
        onCancel={toggleCardModal}
      >
        <Input
          size="large"
          placeholder="Task Title"
          name="taskTitle"
          onChange={handleCardChange}
        />
        <br />
        <br />
        <TextArea
          rows={4}
          placeholder="Task Description"
          name="taskDesc"
          onChange={handleCardChange}
        />
        <br />
        <br />
        <DatePicker.RangePicker style={{ width: "100%" }} name="taskDueDate" />
        <br />
        <br />
        <Select
          defaultValue="Fouzia"
          style={{ width: "100%" }}
          onChange={(e) => setState({ ...state, taskAssignee: "Fouzia" })}
        >
          <Option value="Fouzia">Fouzia</Option>
          <Option value="Noor">Noor</Option>
          <Option value="Zehra">Zehra</Option>
        </Select>
        <br />
        <br />
        <span style={{ marginRight: 8 }}>Task Type:</span>
        {tagsData.map((tag) => (
          <Tag
            color={tag.color}
            key={tag.title}
            onClick={() => setState({ ...state, taskTag: tag.title })}
          >
            {tag.title}
          </Tag>
        ))}
      </Modal>
      {/* modal to get the details of card ends here */}

      {/* modal to get the details of list starts here */}

      <Modal
        title="List"
        visible={listModal}
        onOk={handleSubmit}
        onCancel={toggleListModal}
      >
        <Input size="large" placeholder="List Title" />
        <br />
        <br />
      </Modal>
      {/* modal to get the details of list ends here */}
    </>
  );
};
const mapStateToProps = (state: any) => {
  console.log("card reduceer has data", state.cardReducer);

  return {
    cardsData: state.cardReducer.cards,
    listsData: state.listReducer.lists,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addCard: (
      taskTitle: string,
      taskDesc: string,
      taskTag: string,
      taskDueDate: string,
      taskAssignee: string
    ) =>
      dispatch(
        addCard(taskTitle, taskDesc, taskTag, taskDueDate, taskAssignee)
      ),

    addList: (listTitle: string) => dispatch(addList(listTitle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
