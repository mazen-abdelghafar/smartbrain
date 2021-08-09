import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./ProfileIcon.css";

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  // const [dropdown, SetDropdown] = useState(false);

  // const options = [
  //   { value: "profile", label: "View Profile" },
  //   { value: "signout", label: "Sign Out" },
  // ];

  // const handleValueChange = (e) => {
  //   // console.log(e.value);
  //   if (e.value === "signout") {
  //     onRouteChange("signout");
  //   } else if (e.value === "profile") {
  //     console.log(e.value);
  //   }
  // };

  return (
    <>
      {/* <Dropdown
        options={options}
        onChange={(e) => handleValueChange(e)}
        placeholder={
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 pa1 ba b--black-10 h3 w3"
            alt="avatar"
          />
        }
      /> */}
      <div className="dropdown">
        {/* <button className="dropbtn">Dropdown</button> */}
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
