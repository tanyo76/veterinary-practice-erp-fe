import { Box, Button, Typography } from "@mui/material";
import {
  useDeleteEmployeeMutation,
  useGetClinicEmployeesQuery,
} from "../../services/employee.service";

const Dashboard = () => {
  const { isError, isLoading, isSuccess, data, error } =
    useGetClinicEmployeesQuery();

  const [
    deleteEmployee,
    { isLoading: isDeleteLoading, isError: isErrorDelete },
  ] = useDeleteEmployeeMutation();

  const deleteHandler = (userId: number) => {
    deleteEmployee({ userId });
  };

  return (
    <div>
      <Button variant="contained" sx={{ textTransform: "none" }}>
        Add employee to the clinic
      </Button>

      <Button variant="contained" sx={{ textTransform: "none" }}>
        Create employee
      </Button>

      {!isLoading &&
        isSuccess &&
        data.clinics.map((clinic: any) => (
          <Box>
            <Typography>Clinic name: {clinic.name}</Typography>
            <Typography>Address: {clinic.address}</Typography>
            <Typography>
              Owner:{" "}
              {`${clinic.owner.firstName} ${clinic.owner.lastName} (${clinic.owner.email})`}
            </Typography>
          </Box>
        ))}
    </div>
  );
};

export default Dashboard;
