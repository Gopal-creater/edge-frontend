import React from "react";
import "./List.css";
import ItemInList from "../ItemInList/ItemInList";
import AddListModal from "../AddListModal/AddListModal";
import { PlusOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import CustomButton from "../../../../components/CustomBtn/CustomBtn";
import { logout } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [state, setState] = React.useState({
    openModal: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    dispatch(logout());
  };

  return (
    <div className="list">
      <ItemInList title="Hello" />

      {/* Button for creating new list */}
      <CustomButton
        icon={<PlusOutlined />}
        onClick={() => {
          setState({ ...state, openModal: !state.openModal });
        }}
      >
        New List
      </CustomButton>

      {/* Logout Btn */}
      <CustomButton icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </CustomButton>

      {/* Modal for adding to list */}
      <AddListModal
        open={state.openModal}
        onClose={() => setState({ ...state, openModal: false })}
      />
    </div>
  );
};

export default List;
