import React from "react";
import Tilt from "react-parallax-tilt";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  let boxes = [];
  for (let i = 0; i < box.length; i++) {
    boxes.push(
      <div
        key={i}
        className="bounding-box"
        style={{
          top: box[i].topRow,
          right: box[i].rightCol,
          bottom: box[i].bottomRow,
          left: box[i].leftCol,
        }}
      ></div>
    );
  }

  return (
    <div className="mt5 imagebg center">
      <Tilt>
        {imageUrl ? (
          <img
            src={imageUrl}
            id="inputImage"
            className="faces"
            alt="detected faces"
          />
        ) : null}
      </Tilt>
      {boxes}
    </div>
  );
};

export default FaceRecognition;
