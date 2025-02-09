import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Playlist from "./FetchThumbnail";

const Roadmap = () => {
  const { roadmapName, stepIndex } = useParams();

  const [roadmap, setRoadmap] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
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
            setRoadmap(tech.steps[stepIndex - 1]);
            console.log(tech.steps[stepIndex - 1]);
          }
        } else {
          console.log("No resources found.");
          setRoadmap([]);
        }

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [roadmapName, stepIndex]);

  return (
    <>
      <section id="resources">
        {!isLoading ? (
          <>
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

              {name ? `${roadmap.title}` : `${roadmapName} not Found!`}
            </h1>

            {roadmap?.roadmap ? (
              roadmap?.roadmap?.length > 0 ? (
                <ul>
                  {roadmap?.roadmap.map((rdmp, index) => (
                    <li key={index}>
                      {rdmp[0]}

                      <ol>
                        {rdmp.map((sources, index) => {
                          console.log(sources);

                          if (typeof sources === "string") {
                            return;
                          } else {
                            return (
                              <li key={index * index}>
                                {rdmp[1]?.title ? (
                                  <Link
                                    to={`${
                                      rdmp[1]?.title
                                        ? `/learn/${rdmp[1].title}`
                                        : ""
                                    }`}
                                  >
                                    {rdmp[0]}
                                  </Link>
                                ) : (
                                  <Playlist
                                    url={sources.link}
                                    index={index * index + index}
                                    category={sources.about}
                                    type={sources.type}
                                  />
                                )}
                              </li>
                            );
                          }
                        })}
                      </ol>
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

export default Roadmap;
