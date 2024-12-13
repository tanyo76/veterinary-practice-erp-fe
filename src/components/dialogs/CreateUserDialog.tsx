import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateUserDialog } from "../../store/slices/authSlice";
import { useCreateGlobalUserMutation } from "../../services/employee.service";
import { useEffect } from "react";
import FormAlert from "../feedback/FormAlert";
import { ESeverity } from "../../types/component-props/form-props";

const CreateUserDialog = () => {
  const { showCreateUserDialog } = useSelector((store: any) => store.auth);
  const [createGlobalUser, { isLoading, isError, isSuccess, data, error }] =
    useCreateGlobalUserMutation();

  const dispatch = useDispatch();

  const toggleCreateUserDialogHandler = () => {
    dispatch(toggleCreateUserDialog());
  };

  useEffect(() => {
    if (isSuccess) {
      toggleCreateUserDialogHandler();
    }
  }, [isSuccess]);

  return (
      <Dialog
        open={showCreateUserDialog}
        onClose={toggleCreateUserDialogHandler}
        sx={{ padding: 10 }}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            createGlobalUser(formJson);
          },
        }}
      >
        <DialogTitle>Create global user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When you create a global users everyone in the platform can add them
            to their clinics.
          </DialogContentText>
          <TextField
            autoFocus
            required
            id="name"
            name="firstName"
            label="Fistname"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            id="name"
            name="lastName"
            label="Lastname"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            id="name"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />

          <Select
            id="role"
            name="role"
            label="Role"
            type="text"
            variant="standard"
            fullWidth
            defaultValue={"Manager"}
          >
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Surgeon">Surgeon</MenuItem>
            <MenuItem value="Manager">Nurse</MenuItem>
            <MenuItem value="Surgeon">Technician</MenuItem>
            <MenuItem value="Surgeon">Receptionist</MenuItem>
          </Select>
        </DialogContent>

        {isError && (
          <FormAlert
            severity={ESeverity.error}
            message={(error as any).data.message}
          />
        )}

        <DialogActions>
          <Button onClick={toggleCreateUserDialogHandler}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreateUserDialog;
