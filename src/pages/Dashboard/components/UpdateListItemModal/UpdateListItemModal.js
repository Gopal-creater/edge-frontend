import React, { useState } from "react";
import { Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { updateListItem } from "../../../../network/apis/listItem.api";
import { updateListItemdata } from "../../../../store/slices/listItemSlice";

const UpdateListItemModal = ({ open, onClose, doc }) => {
  //State for this modal
  const [state, setState] = useState({
    loading: false,
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  // Update state whenever listState.selectedList changes
  React.useEffect(() => {
    if (doc) {
      setState({
        loading: false,
        title: doc.title,
        description: doc.description,
      });
    }
  }, [doc]);

  //Handle update
  const handleSubmit = () => {
    //Call api
    setState({ ...state, loading: true });
    updateListItem(doc?._id, {
      title: state.title,
      description: state.description,
    })
      .then((res) => {
        setState({ ...state, loading: false });
        dispatch(updateListItemdata(res?.data));
        onClose();
        toast.success("Successfully updated list item");
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err?.message || "Error updating list item");
      });
  };

  return (
    <>
      <Modal
        title="Update List Item"
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
export default UpdateListItemModal;
