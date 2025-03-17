import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/allProducts.api";
import EachProduct from "../EachProduct/EachProduct";
import './AllProducts.css'
import { useAllProductContext } from "../../contexts/AllProductsContext/AllProductContext";
const AllProducts: FC = () => {
    // type eachProduct = {
    //     thumbnail: string;
    //     title: string;
    //     description: string;
    //     id:number;
    //   };
      
    // type AllProductsProps = eachProduct[]; // An array of Product objects
    // const [AllProducts,setAllProducts] = useState<AllProductsProps>([])
    const {AllProducts,assignAllProducts} = useAllProductContext()
    useEffect(()=>{
        fetchAllProducts().then((response)=>{
            console.log(response.data.products)
            // setAllProducts(response.data.products)
            assignAllProducts(response.data.products)

        }

        )
    },[])
  return ( 
    <>
      <Box component="section"  className="all-products-container">
      {
        AllProducts.map((product)=>{
            return (
                <EachProduct prp1={product} key={product.id}/>
            )
        })
      }
    </Box>
    </>
  );
};

export default AllProducts;


// const handleLogin = () => {
//         UserLogin(loginData).then((response) => {
//             console.log(response)
//             localStorage.setItem('accessToken', response.data.accessToken);
//             localStorage.setItem('refreshToken', response.data.refreshToken);
//         });
//     };

