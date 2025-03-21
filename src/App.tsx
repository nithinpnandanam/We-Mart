import { FC } from "react";
import RouterContainer from "./router/Route";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { DrawerProvider } from "./contexts/DrawerContext/DrawerContext";
import { AllProductsProvider } from "./contexts/AllProductsContext/AllProductContext";
import { ThemeProviders } from "./contexts/ThemeContext/ThemeContext";

const App: FC = () => {
  return (
    <>
      <AuthProvider>
        <AllProductsProvider>
          <DrawerProvider>
            <ThemeProviders>
              <RouterContainer/>
            </ThemeProviders>
          </DrawerProvider>
        </AllProductsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
