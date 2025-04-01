import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { fetchAllUsers } from "../../api/allUsers.api";

import { FC, useEffect, useState } from "react";
import "./UserList.css";
import Search from "../Search/Search";
import { useSearchParams } from "react-router-dom";
import { userSearch } from "../../api/userSearch.api";
import AddUser from "../AddUser/AddUser";


const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    flex: 1,
    headerAlign: "left",
    align: "left",
    minWidth: 180,
  },
];

const UserList: FC = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState<number | undefined>(undefined); // rowCount is expecting a number or undefined .
  const [page, setPage] = useState<number>(0); // Current page (0-based index)
  const [pageSize, setPageSize] = useState<number>(10); // Number of rows per page [Basically its the limit]
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchAllUsers(searchValue, pageSize, page * pageSize).then((response) => {
      setAllUsers(response.data.users);
      setTotalUsers(response.data.total);
    });
  }, [pageSize, page]);
  useEffect(() => {
    userSearch(searchValue).then((response) => {
      setAllUsers(response.data.users);
      setTotalUsers(response.data.total);
    });
  }, [searchValue]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const AddUserModalControl = {
    open,
    handleClose:() => setOpen(false)
  }

  return (
    <Box className="user-list-table-container">
      <Typography variant="h3">User Listing Table</Typography>
      <Box className='search-add-user-container'>
      <Search setSearch={setSearchValue} setParams={setSearchParams} />
      <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>
        Add
      </Button>
      </Box>
      
      <DataGrid
        rows={allUsers}
        columns={columns}
        rowCount={totalUsers}
        paginationMode="server"
        checkboxSelection
        disableRowSelectionOnClick
        onPaginationModelChange={(model) => {
          // console.log("Pagination triggered")
          // onPaginationModelChange will run in cases when pagination is triggered
          if (model.pageSize !== pageSize) {
            setPage(0); // Reset page to 0 if pageSize changes
          }
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        pageSizeOptions={[10, 25, 50, 100]} // Set allowed page sizes
        paginationModel={{ page, pageSize }} // page, pageSize can only be used
        className="user-listing-table"
        disableColumnSelector
        rowHeight={60}
      />

      <AddUser {...AddUserModalControl}/>
    </Box>
  );
};

export default UserList;
