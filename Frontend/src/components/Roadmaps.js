import React from "react";
import { Link } from "react-router-dom";

const Roadmaps = ({ roadmaps }) => {
  console.log(roadmaps);

  return (
    <div className="roadmap">
      {roadmaps?.map((roadmap, index) => (
        <Link
          index={index}
          className={`language-box ${
            roadmap?.name.toLowerCase().split(" ").join("-").split(".")[0] || ""
          }
      `}
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

export default Roadmaps;
