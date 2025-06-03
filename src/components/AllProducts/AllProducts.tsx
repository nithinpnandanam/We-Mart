import { Box } from "@mui/material";

import { fetchAllProducts } from "@/api/allProducts.api";

import EachProduct from "../EachProduct/EachProduct";

import { useAllProductContext } from "@/contexts/AllProductsContext/AllProductContext";
import { useDrawerContext } from "@/contexts/DrawerContext/DrawerContext";

import { FC, useEffect } from "react";

import "./AllProducts.css";
import Sort from "../Sort/Sort";

const AllProducts: FC = () => {
  const { AllProducts, assignAllProducts } = useAllProductContext();
  const { open } = useDrawerContext();
  useEffect(() => {
    console.log("All Products.tsx");
    fetchAllProducts().then((response) => {
      assignAllProducts(response.data.products);
    });
  }, []);
  return (
    <>
      <div className="sort-all-products-container">
        <div className="sort-container">
        <Sort />
        </div>
       
        <Box
          component="section"
          className="all-products-container"
          sx={{
            columnGap: open ? "53px" : "31px",
          }}
        >
          {AllProducts.map((product) => {
            return <EachProduct product={product} key={product.id} />;
          })}
        </Box>
      </div>
    </>
  );
};

export default AllProducts;
