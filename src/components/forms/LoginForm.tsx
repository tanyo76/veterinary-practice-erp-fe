import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import FormAlert from "../feedback/FormAlert";
import { NavLink } from "react-router-dom";
import FormErrorMessage from "../feedback/FormErrorMessage";
import { useLoginMutation } from "../../services/auth.service";
import { LoginFormInput } from "../../types/request-input-types/request-input-types";
import { ESeverity } from "../../types/component-props/form-props";


const LoginForm = () => {
  const [login, { isError, isLoading, data, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
    // login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      {isError && (
        <FormAlert
          severity={ESeverity.error}
          message={(error as any).data.errors[0]}
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
          Login
        </Button>
      )}

      <hr style={{ border: "0.5px solid lightgray" }} />

      <NavLink to="/register">Don't have an account?</NavLink>
    </form>
  );
};

export default LoginForm;
