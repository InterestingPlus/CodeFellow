import React from "react";
import { useNavigate } from "react-router-dom";

const Boxes = ({ data }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`language-box ${
        data?.name.toLowerCase().split(" ").join("-").split(".")[0] || ""
      }`}
      style={{ "--tech-color": data?.color }}
      onClick={() => {
        setTimeout(() => {
          navigate(
            `/learn/${data?.name.toLowerCase().split(" ").join("-") || ""}`
          );
        }, 300);
      }}
    >
      <img src={`/images/${data?.image || ""}`} alt={data?.name || ""} />
      <h3>{data?.name || ""}</h3>
      <p>{data?.description || ""}</p>
    </button>
  );
};

export default Boxes;
