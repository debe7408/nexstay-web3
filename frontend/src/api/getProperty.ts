import { isAxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { Property, PropertyWithOwner } from "../types/property";

type ApiResponseAll = {
  message: string;
  properties?: Property[];
};

type ApiResponseSingle = {
  message: string;
  property?: PropertyWithOwner;
};

type AllPropertiesResponse = {
  message: string;
  properties?: Property[];
  error?: boolean;
};

export const getAllProperties = async (): Promise<AllPropertiesResponse> => {
  try {
    const response = await axiosClient.get<ApiResponseAll>("/properties/");

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
export const getPropertiesPerPage = async (
  page: number
): Promise<AllPropertiesResponse> => {
  try {
    const response = await axiosClient.get<ApiResponseAll>(
      `/properties/page/${page}`
    );

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

type SinglePropertiesResponse = {
  message: string;
  property?: PropertyWithOwner;
  error?: boolean;
};

export const getProperty = async (
  propertyId: string | number
): Promise<SinglePropertiesResponse> => {
  try {
    const response = await axiosClient.get<ApiResponseSingle>(
      `/properties/${propertyId}`
    );

    return {
      message: response.data.message,
      property: response.data.property,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};

export const getBookmarkedProperties =
  async (): Promise<AllPropertiesResponse> => {
    try {
      const response = await axiosClient.get<ApiResponseAll>(
        "properties/bookmark/all/"
      );

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
