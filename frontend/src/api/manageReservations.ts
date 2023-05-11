import axios from "axios";
import axiosClient from "../axios/axiosClient";
import { DateRange } from "../types/dates";
import { Reservation } from "../types/reservation";

type ReservedDates = { start_date: string; end_date: string };
type GetUnavailableDatesResponse = ReservedDates[];
type UnavailableDatesData = { data?: DateRange[]; error?: string };
type ReservationResponseData = { message: string; error?: boolean };
type GetUserResrvationsResponse = Reservation[];
type ReservatioData = {
  message: string;
  data?: Reservation[];
  error?: boolean;
};

export const getUnavailableDates = async (
  propertyId: string | number
): Promise<UnavailableDatesData> => {
  try {
    const response = await axiosClient.get<GetUnavailableDatesResponse>(
      `/properties/availability/${propertyId}`
    );

    const unavailableDates = response.data.map((date: ReservedDates) => {
      const { start_date, end_date } = date;
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      return [startDate, endDate] as DateRange;
    });

    return { data: unavailableDates };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.message };
    } else {
      console.log("unexpected error: ", error);
      return { error: "An unexpected error occurred" };
    }
  }
};

export const reserveDates = async (
  propertyId: number,
  startDate: string,
  endDate: string
): Promise<ReservationResponseData> => {
  try {
    const response = await axiosClient.post(
      `/properties/reserve/${propertyId}`,
      {
        checkIn: startDate,
        checkOut: endDate,
      }
    );
    return { message: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { message: error.response?.data, error: true };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};

export const getUsersReservations = async (): Promise<ReservatioData> => {
  try {
    const response = await axiosClient.get<GetUserResrvationsResponse>(
      `/usersRoute/users/reservations`
    );

    return {
      message: "Information fetched successfully",
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { message: error.message };
    }
    return { message: "An unexpected error occurred", error: true };
  }
};
