import { BaseError } from "./baseError";

export interface ContactInfoResponse extends BaseError {
  contactInfo?: ContactInfo;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
}
