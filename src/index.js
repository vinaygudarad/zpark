import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MainMenu from "./MainMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import VehicleState from "./VehicleState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="zpark/">
      <Routes>
        <Route exact path="/SignIn" element={<SignIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/VehicleState" element={<VehicleState />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/MainMenu" element={<MainMenu />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
