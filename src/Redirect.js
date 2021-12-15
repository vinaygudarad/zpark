import React from "react";
import { Navigate } from "react-router-dom";
function NavigateLog(props) {
  if (props.isLoggedIn) return <Navigate to="/Home" />;
  else return <Navigate to="/MainMenu" />;
}
export default NavigateLog;
