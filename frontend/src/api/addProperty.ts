import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { PropertyForm } from "../types/property";
import { BaseError } from "../types/baseError";

export const addProperty = async (
  propertyData: PropertyForm
): Promise<BaseError> => {
  try {
    await axiosClient.post("/properties/addProperty", propertyData);
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
      message: "Could not add property. Please check your data and try again",
    };
  }

  return {
    hasError: false,
    message: "Property added!",
  };
};
