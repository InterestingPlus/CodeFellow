import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const RoadmapPage = () => {
  const { roadmapName } = useParams();
  const [roadmap, setRoadmap] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    window.localStorage.setItem("last-page", `/roadmap/${roadmapName}`);

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const tech = data[1].roadmaps.find(
          (item) =>
            item.name.toLowerCase().split(" ").join("-") ===
            roadmapName.toLowerCase()
        );

        if (tech) {
          setName(tech.name);

          if (tech.steps) {
            setRoadmap(tech.steps);
          }
        } else {
          console.log("No resources found.");
          setRoadmap([]);
        }

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [roadmapName]);

  return (
    <>
      <section id="resources">
        {!isLoading ? (
          <>
            <h1>
              <i
                className="fa-solid fa-circle-left"
                onClick={() => {
                  window.localStorage.setItem(
                    "last-page",
                    `/roadmap#${roadmapName}`
                  );

                  if (window.history.length > 2) {
                    navigate(-1);
                  } else {
                    navigate(`/roadmap#${roadmapName}`);
                  }
                }}
              ></i>

              {name ? `${name} Roadmap` : `${roadmapName} not Found!`}
            </h1>

            {roadmap ? (
              roadmap?.length > 0 ? (
                <ul>
                  {roadmap.map((rdmp, index) => (
                    <li>
                      <Link to={`${index + 1}`}>
                        <h3>{rdmp.title}</h3>
                        <p>{rdmp.content}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Roadmap not available for {roadmapName}.</p>
              )
            ) : (
              <p>Loading Roadmap for {roadmapName}</p>
            )}
          </>
        ) : (
          <h1>
            <i
              className="fa-solid fa-circle-left"
              onClick={() => {
                if (window.history.length > 2) {
                  navigate(-1);
                } else {
                  navigate("/");
                }
              }}
            ></i>
            Loading {roadmapName}
          </h1>
        )}
      </section>
    </>
  );
};

export default RoadmapPage;
