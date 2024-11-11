import { AppWebRequest } from "../NetworkManager";

export const login = (payload) => {
  return AppWebRequest("/users/signin", "post", { data: payload });
};

export const getMe = () => {
  return AppWebRequest("/users/me");
};
