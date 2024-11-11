import { toast } from "react-toastify";
import { getListItem } from "../../network/apis/listItem.api";
import * as listItemAction from "./../slices/listItemSlice";

export const getListItemAction = (listId) => {
  return (dispatch) => {
    dispatch(listItemAction.setListItemLoading());
    getListItem(listId)
      .then((res) => {
        dispatch(listItemAction.setListItemData(res?.data));
      })
      .catch((err) => {
        toast.error(err?.message);
        dispatch(listItemAction.setListItemError(err));
      });
  };
};
