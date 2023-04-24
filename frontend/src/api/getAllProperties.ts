import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { PropertyInfo } from "../types/property";

export const getAllProperties = async (): Promise<PropertyInfo> => {
  try {
    const response = await axiosClient.get("/properties/getProperties");

    return {
      hasError: false,
      properties: response.data,
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
