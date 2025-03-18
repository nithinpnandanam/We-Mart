import { createContext, FC, useContext, useState } from "react";
import { AllProductContextType, AllProductsProviderProps, AllProductsType } from "./AllProductContext.types";


const AllProductContext = createContext<AllProductContextType | null>(null);


export const AllProductsProvider: FC<AllProductsProviderProps> = ({
  children,
}) => {
  const [AllProducts, setAllProducts] = useState<AllProductsType>([]);
  const assignAllProducts = (param: AllProductsType) => {
    setAllProducts(param);
  };
  const contextValue = {
    AllProducts,
    assignAllProducts,
  };
  return (
    <AllProductContext.Provider value={contextValue}>
      {children}
    </AllProductContext.Provider>
  );
};

export const useAllProductContext = (): AllProductContextType => {
  const context = useContext(AllProductContext);

  if (!context) {
    throw new Error("Use authcontext within auth context provider");
  }

  return context;
};
