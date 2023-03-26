import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { Property } from "../pages/Home/types/property";
import { BaseError } from "../types/baseError";

const item: Property = {
  name: "test name",
  property_type: "test property type",
  country: "test country",
  city: "test city",
  address: "test address",
  price: 100,
  amenities: { wifi: "test amenity 1" },
  pictures: { asd: "test picture 1" },
  booking_status: false,
};

export const addProperty = async (): Promise<BaseError> => {
  try {
    await axiosClient.post("/properties/addProperty", item);
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
