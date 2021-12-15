import React from "react";
import { useLocation } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useState } from "react";
import Footer from "./Footer";
import "./App.scss";
const images = require.context("../public/backgrounds", true);
var vehicleG;
function ReturnVehicle() {
  const location = useLocation();
  const vehicle = location.state
    ? location.state.vehicle
    : { Name: "Dummy", Charge: 20, charging: false, VehicleNumber: "" };
  return vehicle;
}
function VehicleCard() {
  const [buttonText, setButtonText] = useState("Check Status");
  const [vehicleObj, setVehicleObj] = useState(ReturnVehicle());
  vehicleG = vehicleObj;
  return (
    <div className="vehicle-card">
      <h1 className="card-heading">{vehicleObj.Name}</h1>
      {/*
                <div style={imgStyle}><img src=" " alt={vehicle.Name}></img></div>*/}
      <div className="op-score">
        Operational Score: <span id="charge-perc">{vehicleObj.Charge}%</span>
      </div>
      <button
        className="btn btn-pushable btn-charging"
        onClick={() => {
          //!charging and update in db
          //do axios business here
          vehicleObj.charging = !vehicleObj.charging;
          let charging = vehicleObj.charging;
          setVehicleObj(vehicleObj);
          charging
            ? setButtonText("Stop Charging")
            : setButtonText("Start Charging");
        }}
      >
        <span className="btn-front" id="btn-charging">
          {buttonText}
        </span>
      </button>
    </div>
  );
}

export default class VehicleState extends React.Component {
  componentDidMount() {
    //if not dummy.add case case for dummy.
    let img_src = `./${vehicleG.Name.split(" ").join("")}`;
    if (img_src.includes("Dummy")) {
      img_src = "./TeslaModelY";
    }
    if (window.matchMedia("screen and (max-width: 768px)").matches) {
      img_src = img_src + "-mobile";
    }
    let vehicleImg = images(img_src + ".avif").default;
    //console.log(vehicleImg);
    console.log(img_src);
    document.getElementsByClassName(
      "wrapper"
    )[0].style.background = `url(${vehicleImg}) no-repeat 100%`;
  }
  render() {
    return (
      <div className="wrapper">
        <LogoutBtn />
        <VehicleCard />
        <Footer />
      </div>
    );
  }
}
