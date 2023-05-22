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
  amenities: string[];
  safety_amenities: string[];
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
