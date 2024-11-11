import React, { useState } from "react";
import { Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../../../network/apis/list.api";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { updateListData } from "../../../../store/slices/listSlice";

const UpdateListModal = ({ open, onClose }) => {
  //State for this modal
  const listState = useSelector((state) => state.list);
  const [state, setState] = useState({
    loading: false,
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  // Update state whenever listState.selectedList changes
  React.useEffect(() => {
    if (listState?.selectedList) {
      setState({
        loading: false,
        title: listState.selectedList.title,
        description: listState.selectedList.description,
      });
    }
  }, [listState?.selectedList]);

  const handleSubmit = () => {
    //Call api
    setState({ ...state, loading: true });
    updateList(listState?.selectedList?._id, {
      title: state.title,
      description: state.description,
    })
      .then((res) => {
        setState({ ...state, loading: false });
        dispatch(updateListData(res?.data));
        onClose();
        toast.success("Successfully updated list");
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast.error(err?.message || "Error updating list");
      });
  };

  return (
    <>
      <Modal
        title="Update List"
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
export default UpdateListModal;
