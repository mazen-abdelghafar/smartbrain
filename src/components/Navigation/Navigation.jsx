import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";
import Logo from "./Logo/Logo";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, route, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav className="mw8 w-80-ns center pv4">
        <Logo />
        <ProfileIcon toggleModal={toggleModal} onRouteChange={onRouteChange} />
      </nav>
    );
  } else {
    if (route === "signin") {
      return (
        <nav className="mw8 center pv3">
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
        <nav className="mw8 center pv3">
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
        <nav className="mw8 center pv3">
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
