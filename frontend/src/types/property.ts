import { BaseError } from "./baseError";

export interface PropertyInfo extends BaseError {
  properties?: Property[];
}

export interface Property {
  name: string;
  property_type: string;
  country: string;
  city: string;
  address: string;
  price: number;
  amenities: {};
  pictures: {};
  booking_status: boolean;
  id?: number;
  owner_id?: number;
}
