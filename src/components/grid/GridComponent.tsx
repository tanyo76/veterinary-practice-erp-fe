import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDeleteEmployeeMutation } from "../../services/employee.service";
import { Button } from "@mui/material";

const GridComponent = ({ rows, clinicId }: any) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "Employee identificator",
      valueGetter: (value, row) => row.user.id,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "Employee firstname",
      valueGetter: (value, row) => row.user.firstName,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Employee lastname",
      valueGetter: (value, row) => row.user.lastName,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      valueGetter: (value, row) => row.user.email,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      valueGetter: (value, row) => row.user.role,
      flex: 1,
    },
  ];

  const [
    deleteEmployee,
    { isLoading: isDeleteLoading, isError: isErrorDelete, isSuccess },
  ] = useDeleteEmployeeMutation();

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const deleteHandler = () => {
    deleteEmployee({ userIds: rowSelectionModel, clinicId: Number(clinicId) });
  };

  useEffect(() => {
    if (isSuccess) {
      setRowSelectionModel([]);
    }
  }, [isSuccess]);

  return (
    <>
      {!!rowSelectionModel.length && <Button onClick={deleteHandler} variant="outlined" color="error">
        remove selected employees
      </Button>}
      <DataGrid
        rows={rows}
        sx={{ marginTop: "10px", maxHeight: "65vh" }}
        columns={columns}
        loading={isDeleteLoading}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </>
  );
};

export default GridComponent;
