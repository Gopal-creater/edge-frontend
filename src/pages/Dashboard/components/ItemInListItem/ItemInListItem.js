import { Button, Tooltip, Typography } from "antd";
import React from "react";
// import { RightCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./ItemInListItem.css";
import { DeleteOutlined } from "@ant-design/icons";
import { FormOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteListItem } from "../../../../network/apis/listItem.api";
import { deleteListItemData } from "../../../../store/slices/listItemSlice";
import UpdateListItemModal from "../UpdateListItemModal/UpdateListItemModal";

const ItemInListItem = () => {
  const listItemState = useSelector((state) => state.listItem);
  const [state, setState] = React.useState({
    openModal: false,
    deleteLoading: false,
    selectedListItem: null,
  });
  const dispatch = useDispatch();

  //Handle Delete
  const handleDelete = (doc) => {
    setState({ ...state, deleteLoading: true });
    deleteListItem(doc?._id)
      .then((res) => {
        setState({ ...state, deleteLoading: false });
        dispatch(deleteListItemData(doc?._id));
        toast.success("Successfully deleted list item");
      })
      .catch((err) => {
        setState({ ...state, deleteLoading: false });
        toast.error(err?.message || "Error deleting list item");
      });
  };

  return (
    <div>
      {/* List items */}
      {listItemState?.data?.docs?.map((doc, index) => {
        return (
          <div key={index} className="itemInListItem">
            {/* <RightCircleOutlined /> */}
            <div>
              <Typography.Title level={5}>{doc?.title}</Typography.Title>
              <Typography.Text type="secondary">
                {doc?.description}
              </Typography.Text>
              <Typography type="secondary">
                {new Date(doc?.createdAt).toLocaleString()}
              </Typography>
            </div>

            {/* Update and Delete Btns */}
            <div className="updateAndDelete">
              {/* Update Btn */}
              <Tooltip title="Update list item">
                <Button
                  onClick={() =>
                    setState({
                      ...state,
                      openModal: true,
                      selectedListItem: doc,
                    })
                  }
                  shape="circle"
                  icon={<FormOutlined />}
                />
              </Tooltip>

              {/* Delete Btn */}
              <Tooltip title="Delete list item">
                <Button
                  onClick={() => handleDelete(doc)}
                  shape="circle"
                  icon={<DeleteOutlined />}
                  loading={state.deleteLoading}
                />
              </Tooltip>
            </div>
          </div>
        );
      })}

      <UpdateListItemModal
        open={state.openModal}
        onClose={() => setState({ ...state, openModal: false })}
        doc={state.selectedListItem}
      />
    </div>
  );
};

export default ItemInListItem;
