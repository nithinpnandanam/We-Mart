import { AppBar, IconButton, styled, Toolbar, Typography, } from "@mui/material";
import { AppBarProps }from '@mui/material/AppBar';
import { FC } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawer } from "../../contexts/DrawerContext/DrawerContext";
import ProductSearch from "../ProductSearch/ProductSearch";

const Header: FC = () => {
    interface AppBarPropsCustom extends AppBarProps {
        open?: boolean;
      }
    const AppBarStyled = styled(AppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })<AppBarPropsCustom>(({ theme }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
          {
            props: ({ open }) => open,
            style: {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: `${drawerWidth}px`,
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              border:"2px solid red"
            },
          },
        ],
      }));
    const { open, handleDrawerOpen,drawerWidth } = useDrawer()
    
  return (
    <div>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
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
            Persistent drawer
          </Typography>
          <ProductSearch/>
        </Toolbar>
      </AppBarStyled>
    </div>
  );
};

export default Header;
