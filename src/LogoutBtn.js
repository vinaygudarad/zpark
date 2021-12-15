import React from "react";
import { Link } from "react-router-dom";
export default class LogoutBtn extends React.Component {
  render() {
    return (
      <Link to="/">
        <button
          className="btn-pushable btn-logout btn"
          onClick={() => {
            window.localStorage.removeItem("username");
          }}
        >
          <span className="btn-front">Logout</span>
        </button>
      </Link>
    );
  }
}
