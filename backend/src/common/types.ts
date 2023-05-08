type UserTypes = "admin" | "host" | "user";

export type User = {
  id: number;
  publicAddress: string;
  email: string;
  name: string;
  surname: string;
  age: number;
  banned: boolean;
  type: UserTypes;
  ownedProperties?: Property[];
};

export type Property = {
  property_id: number;
  owner_id: number;
  name: string;
  type: string;
  description: string;
  city: string;
  country: string;
  address: string;
  price: number;
  amenities: string;
  safety_amenities: string;
  beds: number;
  bathrooms: number;
  guests: number;
  booking_status: boolean;
};
