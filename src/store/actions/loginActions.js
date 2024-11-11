import { toast } from "react-toastify";
import { getMe, login } from "../../network/apis/auth.api";
import * as authAction from "../slices/authSlice";

export const loginAction = (data, navigate) => {
  return (dispatch) => {
    dispatch(authAction.setLoginLoading());
    login(data)
      .then((res) => {
        //set token to localstorage after login
        localStorage.setItem("token", JSON.stringify(res?.token));
        dispatch(authAction.setLoginData(res?.data));
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err?.message);
        dispatch(authAction.setLoginError(err));
      });
  };
};

export const authCheckAction = (navigate) => {
  return (dispatch) => {
    dispatch(authAction.setAuthLoading());
    getMe()
      .then((res) => {
        //set token to localstorage after getting data
        dispatch(authAction.setAuthData(res?.data));
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err?.message);
        dispatch(authAction.setAuthError(err));
      });
  };
};
