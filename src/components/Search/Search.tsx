import { Search as SearchIcon } from "@mui/icons-material";
import { Box, debounce, InputAdornment, TextField } from "@mui/material";
import "./Search.css";
import { ChangeEvent } from "react";

type objType = {
    search:string
}
type SearchProps = {
    setSearch:(param:string)=>void
    setParams:(param:objType)=>void
}
const Search = (props:SearchProps) => {
    const { setSearch,setParams } = props;
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setDebouncedSearchParams(e.target.value);
    }
    const setDebouncedSearchParams = debounce((value: string) => {
        setSearch(value)
        setParams({ search: value });
    }, 500);
    return (
        <>
            <Box className="search-commmon-container">
                <TextField
                    variant="outlined"
                    placeholder="Search Table"
                    onChange={handleSearch}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    className="search-common"
                />
            </Box>
        </>
    );
};

export default Search;
