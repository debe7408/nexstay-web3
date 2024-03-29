import { AxiosError } from "axios";
import axiosClient from "../axios/axiosClient";

export const uploadAvatar = async (file?: FileList) => {
  try {
    if (!file) {
      return {
        success: false,
        message: "Please select a file",
      };
    }

    const formData = new FormData();
    formData.append("avatar", file[0]);
    const response = await axiosClient.post("/images/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    const requestError = error as AxiosError;
    if (!requestError.response) {
      return {
        success: false,
        message: "Internal error. Please try again later",
      };
    }
    return {
      success: false,
      message: requestError.response.data as string,
    };
  }
};
export const uploadPropertyPictures = async (
  propertyId: number | string,
  files?: FileList
) => {
  try {
    if (!files) {
      return {
        success: false,
        message: "Please select a file",
      };
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("pictures", files[i]);
    }
    formData.append("property_id", propertyId.toString());

    const response = await axiosClient.post("/images/pictures", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    const requestError = error as AxiosError;
    if (!requestError.response) {
      return {
        success: false,
        message: "Internal error. Please try again later",
      };
    }
    return {
      success: false,
      message: requestError.response.data as string,
    };
  }
};
