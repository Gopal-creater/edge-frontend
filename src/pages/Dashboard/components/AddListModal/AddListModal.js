import React, { useState } from "react";
import { Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../../../network/apis/list.api";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import {
  addListData,
  setSelectedList,
} from "../../../../store/slices/listSlice";
import { getListItemAction } from "../../../../store/actions/listItemActions";

const AddListModal = ({ open, onClose }) => {
  //State for this modal
  const [state, setState] = useState({
    loading: false,
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    //check if title  is present
    if (!state.title) return toast.error("Title is required");

    //Call api
    setState({ ...state, loading: true });
    createList({
      title: state.title,
      description: state.description,
    })
      .then((res) => {
        setState({ ...state, loading: false, title: "", description: "" });
        dispatch(addListData(res?.data));
        dispatch(setSelectedList(res?.data));
        dispatch(getListItemAction(res?.data?._id));
        onClose();
        toast.success("Successfully added to list");
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err?.message || "Error adding to list");
      });
  };

  return (
    <>
      <Modal
        title="Add List"
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
export default AddListModal;
