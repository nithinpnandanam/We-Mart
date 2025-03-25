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
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import { ThemeMode } from "../../contexts/ThemeContext/ThemeContext.types";
import { useNavigate } from "react-router-dom";

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
  const { themeMode, switchThemeMode } = useThemeContext();
  const toggleDarkMode = () => {
    themeMode === "light"
      ? switchThemeMode(ThemeMode.DARK)
      : switchThemeMode(ThemeMode.LIGHT);
  };
  const navigate = useNavigate();

  return (
    <div>
      <AppBarStyled position="fixed" open={open} color="secondary">
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
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              We Mart Online Store
            </Typography>
          </Box>
          <Box className="toolbar-end-containe">
            <IconButton
              title="Switch mode"
              // color={themeMode ? "primary" : "secondary"}
              sx={{
                width: "30px",
                height: "30px",
              }}
              onClick={toggleDarkMode}
            >
              {themeMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <ProductSearch />
            <NavbarMenu />
          </Box>
        </Toolbar>
      </AppBarStyled>
    </div>
  );
};

export default Header;
