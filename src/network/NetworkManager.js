import axios from "axios";
import apiUrls from "./baseApiUrl";
import { getToken } from "../utils/authHelper";
import { logout, store } from "../store/store";

//Create axios instance
const appAxiosInstance = axios.create({
  baseURL: apiUrls.API_URL,
  withCredentials: true,
});

//Any Request to Server
export async function AppWebRequest(endUrl, method, config) {
  var errorMsg = null;

  return new Promise(async (resolve, reject) => {
    //Default config
    const defaultConfig = {
      url: endUrl,
      method: method || "get",
      baseURL: apiUrls.API_URL,
    };

    //Merge default config with incomming
    const finalConfig = Object.assign(defaultConfig, config || {});

    try {
      const token = await getToken();

      if (token) {
        finalConfig.headers = {
          ...finalConfig.headers,
          authorization: `Bearer ${token}`,
        };
      }

      const response = await appAxiosInstance(finalConfig);
      resolve(response.data);
    } catch (error) {
      console.log("Error----", error);

      if (error?.response && error.response.status === 401) {
        //Case for expired token
        localStorage.clear();
        store.dispatch(logout());
      } else if (error?.request) {
        errorMsg = "Can not made connection to the server";
      } else {
        errorMsg = "Unexpected error occured!";
      }
      reject({
        message: error?.response?.data?.message || errorMsg,
      });
    }
  });
}
