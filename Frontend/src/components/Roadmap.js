import React from "react";
import { Link } from "react-router-dom";

const Roadmap = ({ roadmaps }) => {
  console.log(roadmaps);

  return (
    <div className="roadmap">
      {roadmaps?.map((roadmap, index) => (
        <Link
          index={index}
          className="language-box"
          style={{ background: `${roadmap?.color || "#fff"}` }}
          to={`/roadmap/${
            roadmap?.name.toLowerCase().split(" ").join("-") || ""
          }`}
        >
          <img
            src={`../images/${roadmap?.image || ""}`}
            alt={roadmap?.name || ""}
          />
          <h3>{roadmap?.name || ""}</h3>
          <p>{roadmap?.description || ""}</p>
        </Link>
      ))}
    </div>
  );
};

export default Roadmap;
