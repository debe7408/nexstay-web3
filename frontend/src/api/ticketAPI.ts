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

type ApiGetTicketsResponse = {
  tickets: Ticket[];
  message: string;
};

type GetTicketsResponse = {
  message: string;
  error?: boolean;
  tickets?: Ticket[];
};

export const getUserTickets = async (): Promise<GetTicketsResponse> => {
  try {
    const response = await axiosClient.get<ApiGetTicketsResponse>(
      `/tickets/user`
    );
    return {
      tickets: response.data.tickets,
      message: response.data.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
