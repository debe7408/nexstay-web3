import { BaseError } from "./baseError";

export interface PropertyInfo extends BaseError {
  properties?: Property[];
}

export interface SinglePropertyInfo extends BaseError {
  property?: Property;
}

export interface Property {
  name: string;
  description: string;
  type: string;
  country: string;
  city: string;
  address: string;
  price: number;
  amenities: string[];
  safety_amenities: string[];
  pictures: {};
  beds: number;
  guests: number;
  bathrooms: number;
  booking_status: boolean;
  property_id: number;
  id?: number;
  owner_id: number;
  owner_firstName: string;
  owner_lastName: string;
  owner_email: string;
}

export interface PropertyForm extends PropertyInfoForm {
  name: string;
  price: number;
  description: string;
  booking_status: boolean;
}

export interface PropertyInfoForm {
  type: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  size: {
    guests: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  safety_amenities: string[];
  pictures: FileList;
}
