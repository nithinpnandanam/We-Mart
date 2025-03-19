import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

import { fetchAllUsers } from "../../api/allUsers.api";

import { FC, useEffect, useState } from "react";
import "./UserList.css";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    editable: true,
  },
];

const UserList: FC = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState<number | undefined >(undefined); // rowCount is expecting a number or undefined .
  const [page, setPage] = useState<number>(0); // Current page (0-based index)
  const [pageSize, setPageSize] = useState<number>(10); // Number of rows per page [Basically its the limit]
  useEffect(() => {
    fetchAllUsers(pageSize,page*pageSize).then((response) => {
      setAllUsers(response.data.users);
      setTotalUsers(response.data.total)
    });
  }, [pageSize,page]);


  return (
    <Box className="user-list-table-container">
      <Typography variant="h3">User Listing Table</Typography>
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
        pageSizeOptions={[10, 25, 50,100]} // Set allowed page sizes
        paginationModel={{ page, pageSize }} // page, pageSize can only be used 
        
      />
    </Box>
  );
};

export default UserList;
