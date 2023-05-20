import { isAxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { Ticket } from "../types/tickets";

type PostReviewResponse = { message: string };
type ApiCallResponse = {
  message: string;
  error?: boolean;
};

export const postTicket = async (
  property_id: string | number,
  message: string
): Promise<ApiCallResponse> => {
  try {
    const response = await axiosClient.post<PostReviewResponse>(
      `/tickets/${property_id}`,
      {
        message: message,
      }
    );
    return {
      message: response.data.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
