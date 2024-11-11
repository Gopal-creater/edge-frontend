import React from "react";
import "./ListItem.css";
import ListItemTitle from "../ListItemHeader/ListItemHeader";
import { useDispatch, useSelector } from "react-redux";
import { getListItemAction } from "../../../../store/actions/listItemActions";
import { Skeleton } from "antd";
import ItemInListItem from "../ItemInListItem/ItemInListItem";
import { PlusOutlined } from "@ant-design/icons";
import AddListItemModal from "../AddListItemModal/AddListItemModal";
import CustomButton from "../../../../components/CustomBtn/CustomBtn";

const ListItem = () => {
  const listState = useSelector((state) => state.list);
  const listItemState = useSelector((state) => state.listItem);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    openModal: false,
  });

  React.useEffect(() => {
    if (listState?.selectedList?._id) {
      dispatch(getListItemAction(listState.selectedList._id));
    }
  }, [dispatch, listState?.selectedList?._id]);

  return (
    <div className="listItem">
      <ListItemTitle />

      <div className="listItemList">
        {listItemState?.loading ? (
          // Loading skeleton
          <Skeleton active />
        ) : (
          <div>
            {/* Items in list */}
            <ItemInListItem />

            {/*Show Button for creating new list if listState is present*/}
            {listState?.selectedList && (
              <CustomButton
                icon={<PlusOutlined />}
                onClick={() => {
                  setState({ ...state, openModal: !state.openModal });
                }}
              >
                Add to {listState?.selectedList?.title}
              </CustomButton>
            )}
          </div>
        )}
      </div>

      {/* Modal for adding to List item */}
      <AddListItemModal
        open={state.openModal}
        onClose={() => setState({ ...state, openModal: false })}
      />
    </div>
  );
};

export default ListItem;
