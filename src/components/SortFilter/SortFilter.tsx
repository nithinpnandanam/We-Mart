import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useState } from "react";
import { fetchAllProducts } from "../../api/allProducts.api";


const SortFilter: FC = () => {

  const [sortBy, setSortBy] = useState<string>("asc");
  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    console.log(event.target.value)
    fetchAllProducts("title" , event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={"asc"}>Sort by title (Asc)</MenuItem>
          <MenuItem value={"desc"}>Sort by title (Desc)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFilter;
