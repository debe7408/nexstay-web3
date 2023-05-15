export type Reservation = {
  id: number;
  property_id: number;
  user_id: number;
  start_date: Date | string;
  end_date: Date | string;
  status: ReservationStatus;
  booking_time: Date | string;
};

export enum ReservationStatus {
  PENDING = "pending_payment",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  EXPIRED = "expired",
  CANCELED = "canceled",
}
