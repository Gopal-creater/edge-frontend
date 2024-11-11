import React, { useState } from "react";
import { Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { createListItem } from "../../../../network/apis/listItem.api";
import { addListItemData } from "../../../../store/slices/listItemSlice";

const AddListItemModal = ({ open, onClose }) => {
  //State for this modal
  const [state, setState] = useState({
    loading: false,
    title: "",
    description: "",
  });

  //State of listItem in store
  const listItemState = useSelector((state) => state.listItem);
  const listState = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    //check if title  is present
    if (!state.title) return toast.error("Title is required");

    //Call api
    setState({ ...state, loading: true });
    createListItem({
      title: state.title,
      description: state.description,
      listId: listState?.selectedList?._id,
    })
      .then((res) => {
        setState({ ...state, loading: false, title: "", description: "" });
        dispatch(addListItemData(res?.data));
        onClose();
        toast.success("Successfully added to list");
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err?.message || "Error adding to list items");
      });
  };

  return (
    <>
      <Modal
        title="Add List Item"
        open={open}
        onOk={handleSubmit}
        confirmLoading={state.loading}
        onCancel={onClose}
      >
        <Input
          style={{ marginBottom: "10px" }}
          value={state.title}
          placeholder="Title"
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />

        <TextArea
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          placeholder="Description"
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />
      </Modal>
    </>
  );
};
export default AddListItemModal;
