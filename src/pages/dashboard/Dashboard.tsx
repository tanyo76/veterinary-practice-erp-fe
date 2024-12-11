import { Box, Button, Typography } from "@mui/material";
import { useGetClinicsQuery } from "../../services/employee.service";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isError, isLoading, isSuccess, data, error } = useGetClinicsQuery();

  const navigate = useNavigate();

  const goToClinicInfoHandler = (clinicId: number) => {
    navigate(`${clinicId}`);
  };

  return (
    <div>
      {!isLoading &&
        isSuccess &&
        data.clinics.map((clinic: any) => (
          <Box key={clinic.id}>
            <Button onClick={() => goToClinicInfoHandler(clinic.id)}>Go to clinic</Button>
            <Typography>Clinic name: {clinic.name}</Typography>
            <Typography>Address: {clinic.address}</Typography>
            <Typography>
              Owner:{" "}
              {`${clinic.owner.firstName} ${clinic.owner.lastName} (${clinic.owner.email})`}
            </Typography>
          </Box>
        ))}

      {!isLoading && isSuccess && data.clinics.length == 0 && (
        <Typography variant="h6">
          This user is not part of any clinic yet!
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
