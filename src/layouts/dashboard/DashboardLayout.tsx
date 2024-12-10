import { PropsWithChildren } from "react";
import AppBarComponent from "../../components/layouts/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { email } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clearAuthState());
    navigate("/");
  };
  return (
    <>
      <AppBarComponent email={email} logoutHandler={logoutHandler} />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
