import {
  PageHeader,
  Button,
  Modal,
  Input,
  DatePicker,
  Select,
  Tag,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ICard, IList } from "../common/interfaces";
import { connect } from "react-redux";
import { addCard, updateCard } from "../actions/cardActions";
import { addList, fetchListItems } from "../actions/listActions";
import TrelloList from "./TrelloList";
const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  addList: (listTitle: string) => void;
  listsData: [];
  addCard: (
    taskId: number,
    taskTitle: string,
    taskDesc: string,
    taskTag: string,
    taskDueDate: string,
    taskAssignee: string
  ) => void;
  fetchListItems: () => void;
  updateCard: (card: ICard, newStatus: string) => void;
}
const TrelloBoard: React.FC<IProps> = ({
  addCard,
  listsData,
  addList,
  fetchListItems,
  updateCard,
}) => {
  const [listModal, setListModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [lists, setLists] = useState<IList[]>([]);

  const [state, setState] = useState<ICard>({
    taskId: 0,
    taskTitle: "",
    taskDesc: "",
    taskTag: "",
    taskDueDate: "",
    taskAssignee: "",
  });
  const [listTitle, setListTitle] = useState<string>("");
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
  const clearState = () => {
    setListTitle("");
    setState({
      taskId: 0,
      taskTitle: "",
      taskDesc: "",
      taskTag: "",
      taskDueDate: "",
      taskAssignee: "",
    });
  };
  const toggleListModal = () => {
    clearState();
    setListModal(!listModal);
  };
  const toggleCardModal = () => {
    clearState();
    setCardModal(!cardModal);
  };

  const handleListSubmit = () => {
    addList(listTitle);
    toggleListModal();
  };
  const handleCardChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date: any, dateString: string) => {
    setState({ ...state, taskDueDate: dateString });
  };
  const handleSubmit = () => {
    addCard(
      state.taskId,
      state.taskTitle,
      state.taskDesc,
      state.taskTag,
      state.taskDueDate,
      state.taskAssignee
    );
    toggleCardModal();
  };
  useEffect(() => {
    fetchListItems();
  }, []);
  useEffect(() => {
    if (listsData.length) setLists(listsData);
  }, [listsData]);

  const style = {
    background: "rgb(193 195 197) ",
    padding: "8px 0",
  };

  const onDrop = (item: ICard, monitor: any, status: string) => {
    updateCard(item, status);
  };
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Trello"
          extra={[
            <Button
              key="3"
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleListModal}
            >
              Add List
            </Button>,
            <Button
              key="2"
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleCardModal}
            >
              Add Card
            </Button>,
          ]}
        ></PageHeader>
      </div>

      <Row gutter={20} style={{ margin: 0 }}>
        {lists.map((list, index) => {
          return (
            <Col
              order={
                list.listTitle === "bug" ? 1 : list.listTitle == "task" ? 2 : 3
              }
              key={`${index}${list}`}
              xs={{ span: 8 }}
              sm={{ span: 8 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              className="gutter-row"
            >
              <div style={style}>
                <TrelloList list={list} onDrop={onDrop} />
              </div>
            </Col>
          );
        })}
      </Row>
      {/* modal to get the details of card start here */}
      <Modal
        title="Card"
        visible={cardModal}
        onOk={handleSubmit}
        onCancel={toggleCardModal}
      >
        <Input
          value={state.taskTitle}
          size="large"
          placeholder="Task Title"
          name="taskTitle"
          onChange={handleCardChange}
        />
        <br />
        <br />
        <TextArea
          value={state.taskDesc}
          rows={4}
          placeholder="Task Description"
          name="taskDesc"
          onChange={handleCardChange}
        />
        <br />
        <br />
        <DatePicker
          style={{ width: "100%" }}
          name="taskDueDate"
          onChange={handleDateChange}
        />
        <br />
        <br />
        <Select
          value={state.taskAssignee}
          defaultValue="select"
          style={{ width: "100%" }}
          onChange={(event) => setState({ ...state, taskAssignee: event })}
        >
          <Option value="select" disabled selected>
            Select One
          </Option>
          <Option value="Fouzia">Fouzia</Option>
          <Option value="Noor">Noor</Option>
          <Option value="Zehra">Zehra</Option>
        </Select>
        <br />
        <br />
        <span style={{ marginRight: 8 }}>Task Type:</span>
        {tagsData.map((tag) => (
          <Tag
            style={styles.tag}
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
        onOk={handleListSubmit}
        onCancel={toggleListModal}
      >
        <Input
          size="large"
          placeholder="List Title"
          value={listTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setListTitle(e.target.value)
          }
        />
        <br />
        <br />
      </Modal>
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
    addList: (listTitle: string) => dispatch(addList(listTitle)),
    addCard: (
      taskId: number,
      taskTitle: string,
      taskDesc: string,
      taskTag: string,
      taskDueDate: string,
      taskAssignee: string
    ) =>
      dispatch(
        addCard(taskId, taskTitle, taskDesc, taskTag, taskDueDate, taskAssignee)
      ),
    updateCard: (card: ICard, newStatus: string) =>
      dispatch(updateCard(card, newStatus)),
    fetchListItems: () => dispatch(fetchListItems()),
  };
};
const styles = {
  tag: {
    cursor: "pointer",
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(TrelloBoard);
