import { Alert } from "@mui/material";
import { ESeverity } from "../../types/component-props/form-props";

const FormAlert = (props: {
  severity: ESeverity;
  message: string;
  children?: React.ReactNode | undefined;
}) => {
  return (
    <Alert severity={props.severity} style={{ padding: 0 }}>
      {props.message}
      {props.children}
    </Alert>
  );
};

export default FormAlert;
