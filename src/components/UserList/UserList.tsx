import { FC, useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/allUsers.api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'number',
        editable: true,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        type: 'number',
        editable: true,
      },
  ];
  
const UserList: FC = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetchAllUsers().then((response) => {
      console.log(response.data.users);
      setAllUsers(response.data.users)
    });
  },[]);

  const rows = allUsers.map(({ firstName, lastName, age,email,phone,id }) => ({
    firstName,
    lastName,
    age,
    email,
    phone,
    id
  }));
  

  console.log("filteredPeople",rows)
  
  return (
    <Box sx={{ height: 400 }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
  );
};

export default UserList;
