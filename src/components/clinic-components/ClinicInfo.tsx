import { Box, IconButton, LinearProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useUpdateClinicMutation } from "../../services/clinic.service";

type OwnerInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Clinic = {
  name: string;
  address: string;
  id: number;

  owner: OwnerInfo;
};

type ClinicProps = {
  clinic: Clinic;
};

const ClinicInfo = ({ clinic }: ClinicProps) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);

  const [updateClinic, { isLoading, isError, isSuccess }] =
    useUpdateClinicMutation();

  const toggleHandler = () => {
    setShowNameInput((prevState) => !prevState);
  };

  const toggleAddressInputHandler = () => {
    setShowAddressInput((prevState) => !prevState);
  };

  const [clinicData, setClinicData] = useState({
    name: clinic.name,
    address: clinic.address,
  });

  const handleChange = (e, inputName: string) => {
    const value = e.target.value;
    console.log(value);
    setClinicData((prevState: any) => ({ ...prevState, [inputName]: value }));
  };

  const updateHandler = (inputName: string) => {
    updateClinic({ clinicId: clinic.id, ...clinicData });

    if (inputName == "name") {
      toggleHandler();
    } else {
      toggleAddressInputHandler();
    }
  };

  return (
    <Box sx={{ margin: "10px 0px" }}>
      {isLoading && <LinearProgress />}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Clinic name:</Typography>
        {!showNameInput && <Typography>{clinic.name}</Typography>}

        {showNameInput && (
          <TextField
            variant="outlined"
            size="small"
            defaultValue={clinic.name}
            onChange={(e) => handleChange(e, "name")}
          />
        )}

        {showNameInput ? (
          <IconButton onClick={() => updateHandler("name")}>
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton onClick={toggleHandler}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      {/* Address */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Clinic address:</Typography>
        {!showAddressInput && <Typography>{clinic.address}</Typography>}

        {showAddressInput && (
          <TextField
            variant="outlined"
            size="small"
            defaultValue={clinic.address}
            onChange={(e) => handleChange(e, "address")}
          />
        )}

        {showAddressInput ? (
          <IconButton onClick={() => updateHandler("address")}>
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton onClick={toggleAddressInputHandler}>
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Typography>
        Owner:{" "}
        {`${clinic.owner.firstName} ${clinic.owner.lastName} (${clinic.owner.email})`}
      </Typography>
    </Box>
  );
};

export default ClinicInfo;
