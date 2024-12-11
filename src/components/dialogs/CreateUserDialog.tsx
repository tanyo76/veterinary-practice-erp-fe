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

const CreateUserDialog = () => {
  const { showCreateUserDialog } = useSelector((store: any) => store.auth);
  const [createGlobalUser, { isLoading, isError, isSuccess, data }] =
    useCreateGlobalUserMutation();

  const dispatch = useDispatch();

  const toggleCreateUserDialogHandler = () => {
    dispatch(toggleCreateUserDialog());
  };

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
          toggleCreateUserDialogHandler();
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
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCreateUserDialogHandler}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
