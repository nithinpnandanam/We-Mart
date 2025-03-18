import { createContext, FC, useContext, useState } from "react";
import { DrawerContextType, DrawerProviderProps } from "./DrawerContext.types";


const DrawerContext = createContext<DrawerContextType | null>(null)
export const DrawerProvider:FC <DrawerProviderProps>= ({children}) =>{

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const drawerWidth = 300
    const DrawerContextValues = {
        open,
        handleDrawerOpen,
        handleDrawerClose,
        drawerWidth
    }
    return(
        <DrawerContext.Provider value={DrawerContextValues}>
            {children}
        </DrawerContext.Provider>
    )
}

// Custom hook for using the context
export const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
      throw new Error("useDrawerContext must be used within a DrawerProvider");
    }
    return context;
  };