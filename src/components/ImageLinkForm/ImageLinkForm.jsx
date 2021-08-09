import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="imageLink">
      <p className="f4 italic">
        This magic brain will detect faces in your pictures. give it a try!
      </p>
      <div className="center imageLinkForm" style={{ position: "relative" }}>
        <div className="imageLinkBg"></div>
        <div className="center pa4 br3 shadow">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 link dim pointer pv2 white dib bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect Faces!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
