import axiosClient from "../axios/axiosClient";
import { User } from "../types/user";

type RequestResponse = {
  message: string;
  token: string;
  user: User;
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
      message: response.data.message,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    return {
      hasError: true,
      message: "Internal Server Error. Please try again later.",
    };
  }
};
