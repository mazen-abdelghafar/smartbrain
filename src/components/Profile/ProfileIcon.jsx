import React from "react";
import "react-dropdown/style.css";
import "./ProfileIcon.css";

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  return (
    <>
      <div className="dropdown">
        <img
          src="http://tachyons.io/img/logo.jpg"
          className="br-100 pa2 ba b--black-10 h3 w3 dropbtn"
          alt="avatar"
        />
        <div className="dropdown-content">
          <a href="#0" onClick={toggleModal}>
            View Profile
          </a>
          <a href="#0" onClick={() => onRouteChange("signout")}>
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfileIcon;
