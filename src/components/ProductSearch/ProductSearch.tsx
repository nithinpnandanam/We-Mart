import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { productSearch } from "../../api/productSearch.api";

import { useAllProductContext } from "../../contexts/AllProductsContext/AllProductContext";

import { useEffect, useState } from "react";

import './ProductSearch.css'
import { fetchAllProducts } from "../../api/allProducts.api";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "27ch",
      },
    },
  },
}));
const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { assignAllProducts } = useAllProductContext();

  // useEffect(() => {
  //   const debounceTimeout = setTimeout(() => {
  //     if (searchQuery.trim() === '') {
  //       // If search is cleared, fetch all products
  //       fetchAllProducts().then((res) => {
  //         assignAllProducts(res.data.products);
  //       });
  //     } else {
  //       // Otherwise, do a search
  //       productSearch(searchQuery).then((res) => {
  //         assignAllProducts(res.data.products);
  //       });
  //     }
  //   }, 300);
  
  //   return () => clearTimeout(debounceTimeout);
  // }, [searchQuery]);

  
  useEffect(() => {
    // if (searchQuery.trim() === '') return;
    console.log("In UseEffect ProductSearch.tsx");
  
    const debounceTimeout = setTimeout(() => {
      productSearch(searchQuery).then((res) => {
        assignAllProducts(res.data.products);
      });
    }, 300);
  
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);
  
  return (
    <Search className="search-container">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Search>
  );
};

export default ProductSearch;
