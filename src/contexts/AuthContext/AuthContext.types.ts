import { ReactNode } from "react";

export type AuthContextType = {
  isLoggedIn:boolean;
  login: () => void;
  logout: () => void;
  role: Roles|null;
  setRole: (role: Roles) => void;
};
export type AuthProviderProps = {
  children: ReactNode;
};

export enum Roles {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}
