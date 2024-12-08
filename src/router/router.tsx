import { useRoutes } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import PageNotFound from "../pages/404/NotFoundPage";
import FormLayout from "../layouts/form/FormLayout";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <FormLayout
          heading="Hi, Welcome Back"
          subHeading="Enter you credentials to continue"
        >
          <LoginPage />
        </FormLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <FormLayout
          heading="Hi, Welcome Back"
          subHeading="Register as a veterinary practice owner"
        >
          <RegisterPage />
        </FormLayout>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routes;
};

export default Router;
