import React from "react";
import "./ListItemHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FormOutlined } from "@ant-design/icons";
import { deleteList } from "../../../../network/apis/list.api";
import { toast } from "react-toastify";
import { deleteListData } from "../../../../store/slices/listSlice";
import { deleteAllListItemData } from "../../../../store/slices/listItemSlice";
import UpdateListModal from "../UpdateListModal/UpdateListModal";

const ListItemHeader = () => {
  const listState = useSelector((state) => state.list);
  const [state, setState] = React.useState({
    deleteLoading: false,
    openModal: false,
  });
  const dispatch = useDispatch();

  const handleDelete = () => {
    setState({ ...state, deleteLoading: true });
    deleteList(listState?.selectedList?._id)
      .then((res) => {
        setState({ ...state, deleteLoading: false });
        dispatch(deleteListData(listState?.selectedList?._id));
        dispatch(deleteAllListItemData());
        toast.success("Successfully deleted list");
      })
      .catch((err) => {
        setState({ ...state, deleteLoading: false });
        toast.error(err?.message || "Error deleting list");
      });
  };

  return (
    <div className="listItemTitle">
      {/* Title */}
      <Typography.Text
        style={{ color: "white", fontSize: "25px", fontWeight: "bold" }}
      >
        {listState?.selectedList?.title}
      </Typography.Text>

      {/*Show Update and delete btn only when there is data*/}
      {listState?.selectedList && (
        <div className="updateAndDelete">
          {/* Update Btn */}
          <Tooltip title="Update list">
            <Button
              onClick={() => setState({ ...state, openModal: true })}
              shape="circle"
              icon={<FormOutlined />}
            />
          </Tooltip>

          {/* Delete Btn */}
          <Tooltip title="Delete list">
            <Button
              onClick={handleDelete}
              shape="circle"
              icon={<DeleteOutlined />}
              loading={state.deleteLoading}
            />
          </Tooltip>
        </div>
      )}

      {/* Modal for updating the list */}
      <UpdateListModal
        open={state.openModal}
        onClose={() => setState({ ...state, openModal: false })}
      />
    </div>
  );
};

export default ListItemHeader;
