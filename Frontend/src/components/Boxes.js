import React from "react";
import { useNavigate } from "react-router-dom";

const Boxes = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="language-box"
      style={{ "--tech-color": data?.color }}
      onClick={() => {
        setTimeout(() => {
          navigate(`/learn/${data?.name || ""}`);
        }, 300);
      }}
    >
      <img src={`/images/${data?.image || ""}`} alt={data?.name || ""} />
      <h3>{data?.name || ""}</h3>
      <p>{data?.description || ""}</p>
    </div>
  );
};

export default Boxes;
