import { BaseError } from "./baseError";

export interface UserInfo extends BaseError {
  user?: User;
}

export type User = {
  id: number;
  type: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  age: number;
  banned: boolean;
};
