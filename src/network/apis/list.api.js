import { AppWebRequest } from "../NetworkManager";

export const createList = (payload) => {
  return AppWebRequest("/lists", "post", { data: payload });
};

export const getList = () => {
  return AppWebRequest("/lists", "get", { params: { sort: "-createdAt" } });
};

export const deleteList = (listId) => {
  return AppWebRequest(`/lists/${listId}`, "delete");
};

export const updateList = (listId, payload) => {
  return AppWebRequest(`/lists/${listId}`, "patch", { data: payload });
};
