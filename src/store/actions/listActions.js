import { toast } from "react-toastify";
import { getList } from "../../network/apis/list.api";
import * as listAction from "./../slices/listSlice";

export const getListAction = () => {
  return (dispatch) => {
    dispatch(listAction.setListLoading());
    getList()
      .then((res) => {
        dispatch(listAction.setListData(res?.data));
        dispatch(listAction.setSelectedList(res?.data?.docs[0]));
      })
      .catch((err) => {
        toast.error(err?.message);
        dispatch(listAction.setListError(err));
      });
  };
};
