import { Box, Typography } from "@mui/material";

type OwnerInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Clinic = {
  name: string;
  address: string;

  owner: OwnerInfo;
};

type ClinicProps = {
  clinic: Clinic;
};

const ClinicInfo = ({ clinic }: ClinicProps) => {
  return (
    <Box sx={{ margin: "10px 0px"}}>
      <Typography>Clinic name: {clinic.name}</Typography>
      <Typography>Address: {clinic.address}</Typography>
      <Typography>
        Owner:{" "}
        {`${clinic.owner.firstName} ${clinic.owner.lastName} (${clinic.owner.email})`}
      </Typography>
    </Box>
  );
};

export default ClinicInfo;
