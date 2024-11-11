import { Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemInList.css";
import { UnorderedListOutlined } from "@ant-design/icons";
import { setSelectedList } from "../../../../store/slices/listSlice";
import { getListItemAction } from "../../../../store/actions/listItemActions";

const ItemInList = () => {
  const listState = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const onItemClick = (doc) => {
    dispatch(setSelectedList(doc));
    dispatch(getListItemAction(doc?._id));
  };

  return (
    <div className="itemInList">
      {listState?.data?.docs?.map((doc, index) => {
        return (
          <div
            key={index}
            className={`item ${
              listState.selectedList?._id === doc._id ? "active" : ""
            }`}
            onClick={() => onItemClick(doc)}
          >
            <UnorderedListOutlined className="icon" />
            <Typography>{doc?.title}</Typography>
          </div>
        );
      })}
    </div>
  );
};

export default ItemInList;
