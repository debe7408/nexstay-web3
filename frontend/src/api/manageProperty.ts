import { AxiosError, isAxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { PropertyForm } from "../types/property";
import { BaseError } from "../types/baseError";

type ApiResponsePostProperty = {
  message: string;
  propertyId?: number;
};

type ResponseAddProperty = {
  message: string;
  error?: boolean;
  propertyId?: number;
};

export const addProperty = async (
  propertyData: PropertyForm
): Promise<ResponseAddProperty> => {
  try {
    const response = await axiosClient.post<ApiResponsePostProperty>(
      "/properties/",
      propertyData
    );
    return {
      message: response.data.message,
      propertyId: response.data.propertyId,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};

export const deleteProperty = async (
  propertyId: number
): Promise<BaseError> => {
  try {
    const response = await axiosClient.delete(`/properties/${propertyId}`);

    return {
      hasError: false,
      message: response.data.message,
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

export const bookmakrProperty = async (
  propertyId: number
): Promise<BaseError> => {
  try {
    const response = await axiosClient.post(
      `/properties/bookmark/${propertyId}`
    );

    return {
      hasError: false,
      message: response.data.message,
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
export const unsaveProperty = async (
  propertyId: number
): Promise<BaseError> => {
  try {
    const response = await axiosClient.delete(
      `/properties/bookmark/${propertyId}`
    );

    return {
      hasError: false,
      message: response.data.message,
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
