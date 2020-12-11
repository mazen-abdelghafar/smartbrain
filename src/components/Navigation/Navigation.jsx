import React from "react";
import Logo from "./Logo/Logo";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
  if (isSignedIn) {
    return (
      <nav className="mw8 center pv2">
        <Logo />
        <p
          onClick={() => onRouteChange("signout")}
          className="f4 link dim pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    if (route === "signin") {
      return (
        <nav className="mw8 center pv2">
          <Logo />
          <p
            onClick={() => onRouteChange("signup")}
            className="f4 link dim pointer"
          >
            Sign Up
          </p>
        </nav>
      );
    } else if (route === "signup") {
      return (
        <nav className="mw8 center pv2">
          <Logo />
          <p
            onClick={() => onRouteChange("signin")}
            className="f4 link dim pointer"
          >
            Sign In
          </p>
        </nav>
      );
    } else if (route === "signout") {
      return (
        <nav className="mw8 center pv2">
          <Logo />
          <p
            onClick={() => onRouteChange("signup")}
            className="f4 link dim pointer"
          >
            Sign Up
          </p>
        </nav>
      );
    }
  }
};

export default Navigation;
