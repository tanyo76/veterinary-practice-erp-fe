import { useParams } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetClinicEmployeesQuery,
} from "../../services/employee.service";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import AddExistingUserToClinicDialog from "../../components/dialogs/AddExistingUserDialog";
import { toggleAddExistingUserToClinicDialog } from "../../store/slices/authSlice";

const ClinicPage = () => {
  const { clinicId } = useParams();

  const { isLoading, isError, isSuccess, data } =
    useGetClinicEmployeesQuery(clinicId);

  const [
    deleteEmployee,
    { isLoading: isDeleteLoading, isError: isErrorDelete },
  ] = useDeleteEmployeeMutation();

  const dispatch = useDispatch();

  const deleteHandler = (userId: number) => {
    deleteEmployee({ userId, clinicId });
  };
  const toggleAddUserDialog = () => {
    dispatch(toggleAddExistingUserToClinicDialog());
  };

  return (
    <Box>
      <Button variant="outlined">Create user</Button>

      <Button variant="outlined" onClick={toggleAddUserDialog}>
        Add existing user to clinic
      </Button>

      <AddExistingUserToClinicDialog />

      {(isLoading || isDeleteLoading) && <h3>Loading...</h3>}
      {isSuccess &&
        data.employees.map((emp: any) => (
          <Box key={emp.user.id}>
            <h4>
              {emp.user.firstName} {emp.user.lastName}, email: {emp.user.email},
              role: {emp.user.role}
            </h4>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteHandler(emp.user.id)}
            >
              delete
            </Button>
          </Box>
        ))}

      {!isLoading && isSuccess && data.employees.length == 0 && (
        <h3>There are no employees yet!</h3>
      )}
    </Box>
  );
};

export default ClinicPage;
