import React, { useEffect, useState } from "react";

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    fetch(
      `https://h61iytacdj.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`
    )
      .then((resp) => resp.json())
      .then((data) => setEmoji(data.input))
      .catch((err) => console.log(err));
  }, [entries]);

  return (
    <div>
      <div className=" f3">{`${name}, your current entry count is...`}</div>
      <div className="white f1">{entries}</div>
      <div className="white f3 mt2">{`Rank Badge: ${emoji}`}</div>
    </div>
  );
};

export default Rank;
