import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useState } from "react";
import { fetchAllProducts } from "../../api/allProducts.api";
import './Sort.css'
import { useAllProductContext } from "../../contexts/AllProductsContext/AllProductContext";


const Sort: FC = () => {
  const [sortBy, setSortBy] = useState<string>("asc");
  const {assignAllProducts} = useAllProductContext()

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    fetchAllProducts("title" , event.target.value).then((response)=>{
      assignAllProducts(response.data.products)
    })
  };

  return (
    <Box className='sort-filter-container'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort"
          onChange={handleChange}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": { 
                borderRadius: "10px",
                left: "4px !important"
              }
            }
          }}
        >
          <MenuItem value={"asc"}>Sort products by title (Asc)</MenuItem>
          <MenuItem value={"desc"}>Sort products by title (Desc)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
