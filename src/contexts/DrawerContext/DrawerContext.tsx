import { createContext, FC, ReactNode, useContext, useState } from "react";

type DrawerProviderProps = {
    children:ReactNode
}
type DrawerContextType = {
    open:boolean;
    handleDrawerOpen:()=>void;
    handleDrawerClose:()=>void;
    drawerWidth:number
}
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
export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
      throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
  };