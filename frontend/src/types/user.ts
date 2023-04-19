import { BaseError } from "./baseError";

export interface UserInfo extends BaseError {
  user?: User;
}

export type User = {
  id: number;
  publicAddress: string;
  email: string;
  name: string;
  surname: string;
  age: number;
  banned: boolean;
  type: string;
};
