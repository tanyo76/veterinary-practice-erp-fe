import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateClinicMutation } from "../../services/clinic.service";
import { useNavigate } from "react-router-dom";
import FormErrorMessage from "../feedback/FormErrorMessage";
import {
  deleteLocalstorageKey,
  getLocalstorageKey,
  setLocalstorageKey,
} from "../../utils/localstorage.utils";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../store/slices/authSlice";

const CreateClinicForm = () => {
  const [createClinic, { isLoading, isError, isSuccess, data, error }] =
    useCreateClinicMutation();

  type CreateClinicFormInput = {
    name: string;
    address: string;
    ownerId: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClinicFormInput>();

  const onSubmit: SubmitHandler<CreateClinicFormInput> = (data) => {
    data.ownerId = Number(getLocalstorageKey("userId"));
    createClinic(data);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isSuccess) {
    deleteLocalstorageKey("clinicCreationInProgress");
    const email = getLocalstorageKey("email") as string;
    const accessToken = getLocalstorageKey("accessToken") as string;
    dispatch(setAuthState({ email, accessToken }));
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="formTextField">
        <TextField
          size="small"
          label="Clinic name"
          variant="outlined"
          type="text"
          {...register("name", { required: true })}
          disabled={isLoading}
        />

        {errors.name?.type === "required" && (
          <FormErrorMessage errorMessage="Clinic name is required" />
        )}
      </Box>

      <Box className="formTextField">
        <TextField
          size="small"
          label="Clinic address"
          variant="outlined"
          type="text"
          {...register("address", { required: true })}
          disabled={isLoading}
        />

        {errors.address?.type === "required" && (
          <FormErrorMessage errorMessage="Clinic address is required" />
        )}
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          type="submit"
          disabled={isLoading}
          variant="contained"
          style={{ textTransform: "none" }}
        >
          Create clinic
        </Button>
      )}
    </form>
  );
};

export default CreateClinicForm;
