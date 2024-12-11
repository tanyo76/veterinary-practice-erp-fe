import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import FormAlert from "../feedback/FormAlert";
import { NavLink, useNavigate } from "react-router-dom";
import FormErrorMessage from "../feedback/FormErrorMessage";
import { useLoginMutation } from "../../services/auth.service";
import { LoginFormInput } from "../../types/request-input-types/request-input-types";
import { ESeverity } from "../../types/component-props/form-props";
import { useEffect } from "react";
import { setLocalstorageKey } from "../../utils/localstorage.utils";
import { setAuthState } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [login, { isError, isLoading, data, error, isSuccess }] =
    useLoginMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    login(data);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const values = getValues();
      setLocalstorageKey("accessToken", data.token);
      setLocalstorageKey("userId", data.userId);
      setLocalstorageKey("email", values.email);
      dispatch(setAuthState({ accessToken: data.token, email: values.email }));
      navigate("/dashboard");
    }
  }, [isSuccess]);

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
          message={(error as any).data.message}
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
