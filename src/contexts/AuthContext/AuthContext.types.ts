import { ReactNode } from "react";

export type AuthContextType = {
    isLoggedIn:boolean;
    login: () => void;
    logout: () => void;

}
export type AuthProviderProps = {
    children: ReactNode;
}