export type Reservation = {
  id: number;
  property_id: number;
  user_id: number;
  start_date: Date | string;
  end_date: Date | string;
  status: string;
  booking_time: Date | string;
};
