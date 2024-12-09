import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  clearAuthState } from "../../store/slices/authSlice";
import { Button } from "@mui/material";

const Dashboard = () => {
  const data = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clearAuthState());
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Email: {data.email}</h2>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Dashboard;
