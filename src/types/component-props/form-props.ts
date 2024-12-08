import { PropsWithChildren } from "react";

export interface IFormLayoutProps extends PropsWithChildren {
  heading: string;
  subHeading: string;
}

export enum ESeverity {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}
