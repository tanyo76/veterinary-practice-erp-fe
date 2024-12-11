import { Box, Button, Typography } from "@mui/material";
import {
  employeeApi,
  useGetClinicEmployeesQuery,
  useLazyDeleteEmployeeQuery,
} from "../../services/employee.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const { isError, isLoading, isSuccess, data, error } =
    useGetClinicEmployeesQuery();

  const [
    deleteEmployee,
    { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading },
  ] = useLazyDeleteEmployeeQuery();

  const dispatch = useDispatch();

  const deleteHandler = (userId: number) => {
    deleteEmployee({ userId });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(employeeApi.util.resetApiState());
    }
  }, [isDeleteSuccess]);

  return (
    <div>
      <Button variant="contained" sx={{ textTransform: "none" }}>
        Add employee
      </Button>

      {(isLoading || isDeleteLoading) && <h1>Loading...</h1>}
      {isError && JSON.stringify(error as any)}
      {!isLoading && isSuccess && (
        <Box>
          <Typography>Clinic name: {data.clinic.name}</Typography>
          <Typography>Address: {data.clinic.address}</Typography>
          <Typography>
            Owner:{" "}
            {`${data.clinic.owner.firstName} ${data.clinic.owner.lastName} (${data.clinic.owner.email})`}
          </Typography>

          <Typography variant="h4">Employees</Typography>
          {!data.employees.length && <p>No employees yet</p>}
          {data.employees.map((emp: any) => (
            <>
              <p key={emp.userId}>
                {emp.user.firstName} {emp.user.lastName}, email:{" "}
                {emp.user.email}, role: {emp.user.role}
              </p>
              <Button onClick={() => deleteHandler(emp.userId)}>Delete</Button>
            </>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
