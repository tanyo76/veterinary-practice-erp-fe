import { Box, Button, Typography } from "@mui/material";
import { useGetClinicQuery } from "../../services/clinic.service";

const Dashboard = () => {
  const { isError, isLoading, isSuccess, data } = useGetClinicQuery();

  return (
    <div>
      <Button variant="contained" sx={{ textTransform: "none" }}>
        Add employee
      </Button>

      {isLoading && <h1>Loading...</h1>}
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
            <p>
              {emp.user.firstName} {emp.user.lastName}, email: {emp.user.email},
              role: {emp.user.role}
            </p>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
