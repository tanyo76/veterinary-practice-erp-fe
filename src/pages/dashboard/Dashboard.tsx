import { Box, Button, Typography } from "@mui/material";
import { useGetClinicsQuery } from "../../services/clinic.service";
import { useNavigate } from "react-router-dom";
import ClinicInfo from "../../components/clinic-components/ClinicInfo";
import LoadingComponent from "../../components/LoadingComponent";

const Dashboard = () => {
  const { isError, isLoading, isSuccess, data, error } = useGetClinicsQuery();

  const navigate = useNavigate();

  const goToClinicInfoHandler = (clinicId: number) => {
    navigate(`${clinicId}`);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      {!isLoading &&
        isSuccess &&
        data.clinics.map((clinic: any) => (
          <Box sx={{ border: "1px solid gray", padding: "10px" }}>
            <ClinicInfo clinic={clinic} />
            <Button
              onClick={() => goToClinicInfoHandler(clinic.id)}
              variant="contained"
            >
              Go to clinic
            </Button>
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
