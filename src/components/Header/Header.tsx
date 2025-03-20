import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { AppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

import { useDrawerContext } from "../../contexts/DrawerContext/DrawerContext";

import ProductSearch from "../ProductSearch/ProductSearch";
import NavbarMenu from "../AllProducts/NavbarMenu/NavbarMenu";

import { FC } from "react";
import "./Header.css";

const Header: FC = () => {
  interface AppBarPropsCustom extends AppBarProps {
    open?: boolean;
  }
  const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarPropsCustom>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));
  const { open, handleDrawerOpen, drawerWidth } = useDrawerContext();

  return (
    <div>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar className="toolbar-container">
          <Box className="menu-name-container">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              We Mart Online Store
            </Typography>
          </Box>
              <Box className='search-menu-container'>
              <ProductSearch />
              <NavbarMenu/>
              </Box>
          
        </Toolbar>
      </AppBarStyled>
    </div>
  );
};

export default Header;
