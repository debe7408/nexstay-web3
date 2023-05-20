import { isAxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { Review } from "../types/reviews";

type PostReviewResponse = { message: string };
type ApiCallResponse = {
  message: string;
  error?: boolean;
  review?: Review;
};

export const postReview = async (
  reservation_id: string,
  rating: number,
  comment: string
): Promise<ApiCallResponse> => {
  try {
    const response = await axiosClient.post<PostReviewResponse>(
      `/reviews/${reservation_id}`,
      {
        rating: rating,
        comment: comment,
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

type GetReviewResponse = {
  message: string;
  review: Review;
};

export const getReviewByReservationId = async (
  reservation_id: string
): Promise<ApiCallResponse> => {
  try {
    const response = await axiosClient.get<GetReviewResponse>(
      `/reviews/reservation/${reservation_id}`
    );
    return {
      message: response.data.message,
      review: response.data.review,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
