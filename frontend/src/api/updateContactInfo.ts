import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { BaseError } from "../types/baseError";
import { ContactInfo } from "../types/contactInfo";

export const updateContactInfo = async (
  contactInfo: ContactInfo
): Promise<BaseError> => {
  try {
    await axiosClient.post("/usersRoute/updateContactInfo", contactInfo);
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

  return {
    hasError: false,
  };
};
