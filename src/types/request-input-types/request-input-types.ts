export type RegisterFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormInput = {
  email: string;
  password: string;
};
