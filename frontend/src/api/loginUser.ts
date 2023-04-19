import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";

type RequestResponse = {
  message: string;
  token: string;
};
export const loginUser = async (publicAddress?: string) => {
  try {
    const response = await axiosClient.post<RequestResponse>(
      "/usersRoute/users",
      {
        publicAddress: publicAddress,
      }
    );
    return {
      hasError: false,
      token: response.data.token,
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
