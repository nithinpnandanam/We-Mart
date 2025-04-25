import { Box, CssBaseline, styled } from "@mui/material";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import { useDrawerContext } from "@/contexts/DrawerContext/DrawerContext";

import { Outlet } from "react-router-dom";
import './Layout.css'

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
  drawerWidth?: number;
}>(({ theme, open, drawerWidth  }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


const Layout = () => {
  const { open, drawerWidth } = useDrawerContext();
  return (
    <Box  className='layout-container'>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Main open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};
export default Layout;

// Whenever open changes [from context ], the Layout component will re-render.
