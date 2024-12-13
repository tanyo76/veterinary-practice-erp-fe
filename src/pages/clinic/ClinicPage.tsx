import { NavLink, useParams } from "react-router-dom";
import { useGetClinicEmployeesQuery } from "../../services/employee.service";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import AddExistingUserToClinicDialog from "../../components/dialogs/AddExistingUserDialog";
import {
  toggleAddExistingUserToClinicDialog,
  toggleCreateUserDialog,
} from "../../store/slices/authSlice";
import CreateUserDialog from "../../components/dialogs/CreateUserDialog";
import { useGetClinicByIdQuery } from "../../services/clinic.service";
import ClinicInfo from "../../components/clinic-components/ClinicInfo";
import GridComponent from "../../components/grid/GridComponent";
import LoadingComponent from "../../components/LoadingComponent";

const ClinicPage = () => {
  const { clinicId } = useParams();

  const { isLoading, isError, isSuccess, data } =
    useGetClinicEmployeesQuery(clinicId);

  const {
    isLoading: isGetClinicLoading,
    isError: isGetClinicError,
    isSuccess: isGetClinicSuccess,
    data: clinicData,
  } = useGetClinicByIdQuery(clinicId);

  const dispatch = useDispatch();
  const toggleAddUserDialog = () => {
    dispatch(toggleAddExistingUserToClinicDialog());
  };

  const toggleCreateUserDialogHandler = () => {
    dispatch(toggleCreateUserDialog());
  };

  if (isLoading || isGetClinicLoading) {
    return <LoadingComponent />;
  }

  return (
    <Box sx={{ padding: "10px" }}>
      <NavLink to="/dashboard">back</NavLink>
      {isGetClinicSuccess && <ClinicInfo clinic={clinicData.clinic} />}

      <Button
        variant="outlined"
        onClick={toggleCreateUserDialogHandler}
        sx={{ marginRight: "10px" }}
      >
        Create user
      </Button>

      <Button
        variant="outlined"
        onClick={toggleAddUserDialog}
        sx={{ marginRight: "10px" }}
      >
        Add existing user to clinic
      </Button>

      <AddExistingUserToClinicDialog />

      <CreateUserDialog />

      {isSuccess && <GridComponent rows={data.employees} clinicId={clinicId} />}
    </Box>
  );
};

export default ClinicPage;
