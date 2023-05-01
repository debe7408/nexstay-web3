import { BaseError } from "./baseError";
import { Property } from "./property";

export interface UserInfo extends BaseError {
  user?: User;
}

export type User = {
  id: number;
  publicAddress: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  banned: boolean;
  type: string;
  ownedProperties?: Property[];
};
