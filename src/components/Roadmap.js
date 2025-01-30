import React from "react";
import Boxes from "./Boxes";

const Roadmap = ({ roadmaps }) => {
  console.log(roadmaps);

  return (
    <div className="roadmap">
      {roadmaps?.map((roadmap, index) => (
        <Boxes key={index} data={roadmap} />
      ))}
    </div>
  );
};

export default Roadmap;
