import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import FormErrorMessage from "../feedback/FormErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import FormAlert from "../feedback/FormAlert";
import { useRegisterMutation } from "../../services/auth.service";
import { RegisterFormInput } from "../../types/request-input-types/request-input-types";
import { ESeverity } from "../../types/component-props/form-props";

const RegisterForm = () => {
  const [signUp, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();
  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    signUp(data);
  };

  return (
    <>
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
          <FormAlert severity={ESeverity.error} message={(error as any).data} />
        )}

        {isSuccess && (
          <FormAlert severity={ESeverity.success} message={"Account created"}>
            <NavLink to="/"> Login</NavLink>
          </FormAlert>
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
    </>
  );
};

export default RegisterForm;
