import react from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import Footer from "./Footer";
import "./App.scss";
var cars = [
  { Name: "Tesla Model S", Charge: 20, Charging: true, VehicleNumber: "" },
  { Name: "Tesla Model 3", Charge: 20, Charging: true, VehicleNumber: "" },
  { Name: "Tesla Model X", Charge: 20, Charging: true, VehicleNumber: "" },
  { Name: "Tesla Model Y", Charge: 20, Charging: true, VehicleNumber: "" },
];
function VehicleTile(vehicle) {
  return (
    <Link
      to="/VehicleState"
      state={{ vehicle: vehicle }}
      key={vehicle.Name}
      className="Link"
    >
      <button className="btn-pushable ind-vehicle">
        <span className="btn-front">{vehicle.Name}</span>
      </button>
    </Link>
  );
}

function AllVehicles(vehicles) {
  return vehicles.map((vehicle) => {
    return VehicleTile(vehicle);
  });
}
export default class Home extends react.Component {
  constructor(props) {
    super(props);
    this.vehicles = [];
    this.state = { vehicle: null };
  }
  componentWillMount() {
    const ReturnVehicle = (username) => {
      let resp;
      //resp=>fetch.then()
      if (username === "ajeya") resp = cars;
      return resp;
    };
    this.setState({
      vehicles: ReturnVehicle(localStorage.getItem("username")),
    });
  }
  render() {
    return (
      <div className="wrapper">
        <LogoutBtn />
        <div className="vehicle-box">{AllVehicles(this.state.vehicles)}</div>
        <Footer />
      </div>
    );
  }
}
