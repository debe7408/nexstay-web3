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

export interface Property {
  id: number;
  owner_id: number;
  description: string;
  name: string;
  type: string;
  country: string;
  city: string;
  address: string;
  price: number;
  amenities: string;
  safety_amenities: string;
  booking_status: boolean;
  bathrooms: number;
  guests: number;
  beds: number;
  picture_paths: string[];
}

export interface PropertyWithOwner extends Property {
  ownerAddress: string;
  ownerEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
}
