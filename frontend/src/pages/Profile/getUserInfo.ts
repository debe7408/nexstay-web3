import { AxiosError } from "axios";
import axiosClient from "../../axios/axiosClient";
import { UserInfo } from "../../types/user";

export const getSingleUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await axiosClient.get("/users/getUserInfo", {});
    return {
      hasError: false,
      user: response.data,
    };
  } catch (error) {
    const requestError = error as AxiosError;
    if (!requestError.response) {
      return {
        hasError: true,
        message: "Internal error. Please try again later",
      };
    }
    return {
      hasError: true,
      message: requestError.response.data as string,
    };
  }
};

export const getAllUsersInfo = async (): Promise<UserInfo> => {
  try {
    const response = await axiosClient.get("/users/users");

    return {
      hasError: false,
      user: response.data,
    };
  } catch (error) {
    const requestError = error as AxiosError;
    if (!requestError.response) {
      return {
        hasError: true,
        message: "Internal error. Please try again later",
      };
    }
    return {
      hasError: true,
      message: requestError.response.data as string,
    };
  }
};
