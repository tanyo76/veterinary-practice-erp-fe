import { Button, Typography } from "@mui/material";
import { useGetClinicsQuery } from "../../services/employee.service";
import { useNavigate } from "react-router-dom";
import ClinicInfo from "../../components/clinic-components/ClinicInfo";

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
          <>
            <Button onClick={() => goToClinicInfoHandler(clinic.id)}>
              Go to clinic
            </Button>
            <ClinicInfo clinic={clinic} />
          </>
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
