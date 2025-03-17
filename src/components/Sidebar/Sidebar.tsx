import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDrawer } from "../../contexts/DrawerContext/DrawerContext";
import SortFilter from "../SortFilter/SortFilter";
import { fetchAllCategories } from "../../api/allCategories.api";
import { fetchProductByCategory } from "../../api/productByCategory.api";
import { useAllProductContext } from "../../contexts/AllProductsContext/AllProductContext";

const Sidebar: FC = () => {
  const {assignAllProducts} = useAllProductContext();
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const { open, handleDrawerClose,drawerWidth } = useDrawer()
  const theme = useTheme();
  type CategoryType = {
    slug:'string';
    name:'string';
    url:'string';
  }
  const [AllCategories,setAllCategories] = useState<CategoryType[]>([])
  useEffect(()=>{
    fetchAllCategories().then((res)=>{
      setAllCategories(res.data)
      console.log(res.data)
    })
  },[])
  const handleCategorySearch = (category:string) =>{
    fetchProductByCategory(category).then((response)=>{
      console.log(response.data.products)
      assignAllProducts(response.data.products)
    })
  }
  return (
    <Drawer
      sx={{
        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <SortFilter/>
      <Divider />
      <List>
        {AllCategories.map((text, index) => (
          <ListItem key={text.slug} disablePadding>
            <ListItemButton onClick={()=>{handleCategorySearch(text.slug)}}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
