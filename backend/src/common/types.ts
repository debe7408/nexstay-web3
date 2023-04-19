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
};
