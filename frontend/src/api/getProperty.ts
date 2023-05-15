import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { PropertyInfo, SinglePropertyInfo } from "../types/property";

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

export const getProperty = async (
  propertyId: string | number
): Promise<SinglePropertyInfo> => {
  try {
    const response = await axiosClient.get(
      `/properties/getProperties/${propertyId}`
    );

    return {
      hasError: false,
      property: response.data,
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

export const getBookmarkedProperties = async (): Promise<PropertyInfo> => {
  try {
    const response = await axiosClient.get("/properties/bookmark");

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

export const checkIfBookmarked = async (
  propertyId: number
): Promise<boolean> => {
  try {
    const response = await axiosClient.get(
      `/properties/bookmark/${propertyId}}`
    );

    return response.data;
  } catch (error) {
    return false;
  }
};
