import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { authCheckAction } from "./store/actions/loginActions";
import React from "react";
import CustomSpin from "./components/CustomSpin/CustomSpin";
import { getToken } from "./utils/authHelper";

function App() {
  //Initialization
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);

  React.useEffect(() => {
    //check if user is authenticated when token is in localstorage
    const token = getToken();
    if (token) return dispatch(authCheckAction(navigate));

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dispatch]);

  //If error display error
  if (authState.error)
    return authState?.error?.message || "Error authenticating";

  //If loading display loading
  if (authState.loading)
    return (
      <CustomSpin fullscreen={true} tip="Authenticating..." size="large" />
    );

  //Show routes
  return <AppRoutes />;
}

export default App;
