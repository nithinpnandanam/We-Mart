import { Box } from "@mui/material";

import { fetchAllProducts } from "../../api/allProducts.api";

import EachProduct from "../EachProduct/EachProduct";

import { useAllProductContext } from "../../contexts/AllProductsContext/AllProductContext";
import { useDrawerContext } from "../../contexts/DrawerContext/DrawerContext";

import { FC, useEffect } from "react";

import "./AllProducts.css";

const AllProducts: FC = () => {
  const { AllProducts, assignAllProducts } = useAllProductContext();
  const { open } = useDrawerContext();
  useEffect(() => {
    fetchAllProducts().then((response) => {
      assignAllProducts(response.data.products);
    });
  }, []);
  return (
    <>
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
    </>
  );
};

export default AllProducts;

