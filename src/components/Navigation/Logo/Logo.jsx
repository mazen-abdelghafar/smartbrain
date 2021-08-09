import React from "react";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div style={{ width: "82px" }}>
      <img src={brain} alt="brain logo" />
    </div>
  );
};

export default Logo;
