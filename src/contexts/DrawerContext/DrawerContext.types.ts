import { ReactNode } from "react";

export type DrawerProviderProps = {
    children:ReactNode
}
export type DrawerContextType = {
    open:boolean;
    handleDrawerOpen:()=>void;
    handleDrawerClose:()=>void;
    drawerWidth:number
}