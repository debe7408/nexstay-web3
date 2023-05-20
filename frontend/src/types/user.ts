import { BaseError } from "./baseError";

export interface UserInfo extends BaseError {
  user?: User;
}

export type User = {
  id: number;
  publicAddress: string;
  banned: boolean;
  type: UserType;
  email?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};

export enum UserType {
  ADMIN = "admin",
  USER = "user",
  HOST = "host",
}
