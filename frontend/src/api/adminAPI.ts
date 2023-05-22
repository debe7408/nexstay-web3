import { isAxiosError } from "axios";
import axiosClient from "../axios/axiosClient";
import { Ticket } from "../types/tickets";
import { User } from "../types/user";
import { Reservation } from "../types/reservation";
import { PropertyWithOwner } from "../types/property";

type ApiResponseUsers = {
  message: string;
  users: User[];
};
type ApiResponseTickets = {
  message: string;
  tickets: Ticket[];
};
type ApiResponseReservations = {
  message: string;
  reservations: Reservation[];
};
type ApiResponseProperties = {
  message: string;
  properties: PropertyWithOwner[];
};

type ResponseUsers = {
  message: string;
  users?: User[];
  error?: boolean;
};
type ResponseTickets = {
  message: string;
  tickets?: Ticket[];
  error?: boolean;
};
type ResponseReservations = {
  message: string;
  reservations?: Reservation[];
  error?: boolean;
};
type ResponseProperties = {
  message: string;
  properties?: PropertyWithOwner[];
  error?: boolean;
};

export const getAllUsers = async (): Promise<ResponseUsers> => {
  try {
    const response = await axiosClient.get<ApiResponseUsers>(`/admins/users`);
    return {
      message: response.data.message,
      users: response.data.users,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};

export const getAllTickets = async (): Promise<ResponseTickets> => {
  try {
    const response = await axiosClient.get<ApiResponseTickets>(
      `/admins/tickets`
    );
    return {
      message: response.data.message,
      tickets: response.data.tickets,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
export const getAllReservations = async (): Promise<ResponseReservations> => {
  try {
    const response = await axiosClient.get<ApiResponseReservations>(
      `/admins/reservations`
    );
    return {
      message: response.data.message,
      reservations: response.data.reservations,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { message: error.response?.data.message, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
export const getAllProperties = async (): Promise<ResponseProperties> => {
  try {
    const response = await axiosClient.get<ApiResponseProperties>(
      `/admins/properties`
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
