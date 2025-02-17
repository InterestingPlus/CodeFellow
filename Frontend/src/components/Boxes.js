import React from "react";
import { Link } from "react-router-dom";

const Boxes = ({ data }) => {
  return (
    <Link
      className="language-box"
      style={{ background: `${data?.color || "#fff"}` }}
      to={`/learn/${data?.name || ""}`}
    >
      <img src={`/images/${data?.image || ""}`} alt={data?.name || ""} />
      <h3>{data?.name || ""}</h3>
      <p>{data?.description || ""}</p>
    </Link>
  );
};

export default Boxes;
