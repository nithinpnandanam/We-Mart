import { createContext, FC, ReactNode, useContext, useState } from "react";

type eachProduct = {
  thumbnail: string;
  title: string;
  description: string;
  id: number;
};
type AllProductsType = eachProduct[];
type AllProductContextType = {
  AllProducts: AllProductsType;
  assignAllProducts: (param: AllProductsType) => void;
};
const AllProductContext = createContext<AllProductContextType | null>(null);
type AllProductsProviderProps = {
  children: ReactNode;
};
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
