import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddExistingUserToClinicDialog } from "../../store/slices/authSlice";
import {
  useAddEmployeeToClinicMutation,
  useGetAllUsersQuery,
} from "../../services/employee.service";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormAlert from "../feedback/FormAlert";
import { ESeverity } from "../../types/component-props/form-props";

const AddExistingUserToClinicDialog = () => {
  const { addExistingUserToClinicDialogState } = useSelector(
    (state: any) => state.auth
  );

  const location = useLocation();

  const { isLoading, isError, data, isSuccess } = useGetAllUsersQuery();

  const [
    addEmployeeToClinic,
    { isSuccess: isAddSuccess, isError: isAddError, error: addError },
  ] = useAddEmployeeToClinicMutation();

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleAddExistingUserToClinicDialog());
  };

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (isAddSuccess) {
      toggle();
    }
  }, [isAddSuccess]);

  return (
    <Dialog
      open={addExistingUserToClinicDialogState}
      onClose={toggle}
      sx={{ padding: 10 }}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const clinicId = location.pathname.split("/")[2];
          addEmployeeToClinic({ userId, clinicId });
        },
      }}
    >
      <DialogTitle>Add existing user to the clinic</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose an already existing users from the platform and add them to
          your clinic.
        </DialogContentText>
        <Select
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={(data) => setUserId(data.target.value as number)}
        >
          {isSuccess &&
            data.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.email})
              </MenuItem>
            ))}
        </Select>
      </DialogContent>

      {isAddError && (
        <FormAlert
          severity={ESeverity.error}
          message={(addError as any).data.message}
        />
      )}

      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExistingUserToClinicDialog;
