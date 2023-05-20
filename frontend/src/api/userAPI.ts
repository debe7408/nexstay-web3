import { AxiosError, isAxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { UserInfo } from "../types/user";
import { Property } from "../types/property";

export const getSingleUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await axiosClient.get("/users/");
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
    const response = await axiosClient.get("/users/all");

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

type ApiResponse = {
  message: string;
  properties?: Property[];
};

export type OwnedProperties = {
  message: string;
  error?: boolean;
  properties?: Property[];
};

export const getUserProperties = async (): Promise<OwnedProperties> => {
  try {
    const response = await axiosClient.get<ApiResponse>("/users/properties");

    return {
      message: response.data.message,
      properties: response.data.properties,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
