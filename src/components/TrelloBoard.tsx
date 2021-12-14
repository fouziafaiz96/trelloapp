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
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ActionProps, ICard, IList } from "../common/interfaces";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addCard } from "../actions/cardActions";
import { addList } from "../actions/listActions";
import TrelloList from "./TrelloList";

interface IProps {
  addList: (listTitle: string) => void;
  listsData: [];
}
const TrelloBoard: React.FC<IProps> = ({ listsData, addList }) => {
  const [listModal, setListModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [lists, setLists] = useState<IList[]>([]);

  const [state, setState] = useState<ICard>({
    taskTitle: "",
    taskDesc: "",
    taskTag: "",
    taskDueDate: "16-10-2022",
    taskAssignee: "",
  });
  const [listState, setListState] = useState<IList>({
    listTitle: "",
  });
  const toggleListModal = () => {
    setListModal(!listModal);
  };
  const toggleCardModal = () => {
    setCardModal(!cardModal);
  };

  const handleListSubmit = () => {
    addList(listState.listTitle);
    toggleListModal();
  };

  useEffect(() => {
    console.log(listsData);

    setLists(listsData);
  }, [listsData]);

  const style = { background: "#0092ff", padding: "8px 0" };

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

      <Row justify="space-between" style={{ width: "100%" }}>
        {lists.map((list) => {
          return (
            <Col span={4} className="gutter-row">
              <div style={style}>
                <TrelloList list={list} />
              </div>
            </Col>
          );
        })}
      </Row>

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setListState({
              listTitle: e.target.value,
            })
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
  console.log("listReducer has data", state.listReducer);

  return {
    cardsData: state.cardReducer.cards,
    listsData: state.listReducer.lists,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addList: (listTitle: string) => dispatch(addList(listTitle)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrelloBoard);
