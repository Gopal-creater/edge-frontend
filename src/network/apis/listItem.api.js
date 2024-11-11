import { AppWebRequest } from "../NetworkManager";

export const getListItem = (listId) => {
  return AppWebRequest(`/list-items`, "get", {
    params: { listId, sort: "-createdAt" },
  });
};

export const createListItem = (payload) => {
  return AppWebRequest(`/list-items`, "post", {
    data: payload,
  });
};

export const deleteListItem = (listItemId) => {
  return AppWebRequest(`/list-items/${listItemId}`, "delete");
};

export const updateListItem = (listItemId, payload) => {
  return AppWebRequest(`/list-items/${listItemId}`, "patch", { data: payload });
};
