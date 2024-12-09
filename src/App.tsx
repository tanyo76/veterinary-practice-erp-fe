import { useEffect } from "react";
import Router from "./router/router";
import { getLocalstorageKey } from "./utils/localstorage.utils";
import { setAuthState } from "./store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getLocalstorageKey("accessToken");
    const email = getLocalstorageKey("email");

    if (accessToken && email) {
      dispatch(setAuthState({ email, accessToken }));
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return <Router />;
}

export default App;
