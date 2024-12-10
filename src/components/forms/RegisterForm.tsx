import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import FormErrorMessage from "../feedback/FormErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import FormAlert from "../feedback/FormAlert";
import { useRegisterMutation } from "../../services/auth.service";
import { RegisterFormInput } from "../../types/request-input-types/request-input-types";
import { ESeverity } from "../../types/component-props/form-props";
import { useEffect, useState } from "react";
import {
  getLocalstorageKey,
  setLocalstorageKey,
} from "../../utils/localstorage.utils";
import CreateClinicForm from "./CreateClinicForm";
import { setAuthState } from "../../store/slices/authSlice";

const RegisterForm = () => {
  const [signUp, { isLoading, isError, isSuccess, error, data }] =
    useRegisterMutation();

  const [createClinicFormState, setClinicFormState] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();
  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    data.role = "Owner";
    signUp(data);
  };

  useEffect(() => {
    if (getLocalstorageKey("userId")) {
      setClinicFormState(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setLocalstorageKey("userId", data.userId);
      setLocalstorageKey("accessToken", data.accessToken);

      const { email } = getValues();

      setLocalstorageKey("email", email);
      setAuthState({ email: data.email, accessToken: data.accessToken });
      setClinicFormState(true);
    }
  }, [isSuccess]);

  return (
    <>
      {!createClinicFormState && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="formTextField">
            <TextField
              size="small"
              label="Firstname"
              variant="outlined"
              type="text"
              {...register("firstName", { required: true })}
              disabled={isLoading}
            />

            {errors.firstName?.type === "required" && (
              <FormErrorMessage errorMessage="Firstname is required" />
            )}
          </Box>

          <Box className="formTextField">
            <TextField
              size="small"
              label="Lastname"
              variant="outlined"
              type="text"
              {...register("lastName", { required: true })}
              disabled={isLoading}
            />

            {errors.lastName?.type === "required" && (
              <FormErrorMessage errorMessage="Lastname is required" />
            )}
          </Box>

          <Box className="formTextField">
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              type="email"
              {...register("email", { required: true })}
              disabled={isLoading}
            />

            {errors.email?.type === "required" && (
              <FormErrorMessage errorMessage="Email is required" />
            )}
          </Box>

          <Box className="formTextField">
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              {...register("password", { required: true })}
              type="password"
              disabled={isLoading}
            />
            {errors.password?.type === "required" && (
              <FormErrorMessage errorMessage="Password is required" />
            )}
          </Box>

          <Box className="formTextField">
            <TextField
              size="small"
              label="Confirm password"
              variant="outlined"
              {...register("confirmPassword", { required: true })}
              type="password"
              disabled={isLoading}
            />
            {errors.password?.type === "required" && (
              <FormErrorMessage errorMessage="Password confirmation is required" />
            )}
          </Box>

          {isError && (
            <FormAlert
              severity={ESeverity.error}
              message={(error as any).data}
            />
          )}

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              style={{ textTransform: "none" }}
            >
              Register
            </Button>
          )}
          <hr style={{ border: "0.5px solid lightgray" }} />

          <NavLink to="/">Already have an account?</NavLink>
        </form>
      )}

      {createClinicFormState && <CreateClinicForm />}
    </>
  );
};

export default RegisterForm;
