import React from "react";

const Boxes = ({ data }) => {
  console.log(data);

  return (
    <a
      className="language-box"
      style={{ background: `${data?.color || "#fff"}` }}
      href={`/learn/${data?.name || ""}`}
    >
      <img src={`../images/${data?.image || ""}`} alt={data?.name || ""} />
      <h3>{data?.name || ""}</h3>
      <p>{data?.description || ""}</p>
    </a>
  );
};

export default Boxes;
