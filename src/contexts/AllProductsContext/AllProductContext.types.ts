import { ReactNode } from "react";

export type eachProduct = {
  thumbnail: string;
  title: string;
  description: string;
  id: number;
};

export type AllProductsType = eachProduct[];

export type AllProductContextType = {
  AllProducts: AllProductsType;
  assignAllProducts: (param: AllProductsType) => void;
};

export type AllProductsProviderProps = {
  children: ReactNode;
};