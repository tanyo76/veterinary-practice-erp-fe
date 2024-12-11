import { useEffect } from "react";
import Router from "./router/router";
import { getLocalstorageKey } from "./utils/localstorage.utils";
import { setAuthState } from "./store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const accessToken = getLocalstorageKey("accessToken");
    const email = getLocalstorageKey("email");
    const isClinicCreationInProgress = getLocalstorageKey("clinicCreationInProgress");

    if (accessToken && email && !isClinicCreationInProgress) {
      dispatch(setAuthState({ email, accessToken }));
      if(pathname.includes("dashboard")) {
        navigate(pathname);
      } else {
        navigate("/dashboard");
      }
    } else if (accessToken && email && !!isClinicCreationInProgress) {
      navigate("/register");
    } else {
      navigate("/");
    }
  }, []);

  return <Router />;
}

export default App;
