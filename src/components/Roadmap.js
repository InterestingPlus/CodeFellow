import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Playlist from "./FetchThumbnail";
import "./Roadmap.scss";
import Boxes from "./Boxes";

const Roadmap = () => {
  const { roadmapName, stepIndex } = useParams();

  const [roadmap, setRoadmap] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    window.localStorage.setItem(
      "last-page",
      `/roadmap/${roadmapName}/${stepIndex}`
    );

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
          }
        } else {
          console.log("No resources found.");
          setRoadmap([]);
        }

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [roadmapName, stepIndex]);

  const LoadTechnology = ({ title, index }) => {
    const [technology, setTechnology] = useState({
      name: "",
      description: "",
      image: "",
    });

    useEffect(() => {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          const tech = data[0].technologies.find(
            (item) => item.name.toLowerCase() === title.toLowerCase()
          );

          if (tech) {
            setTechnology({
              name: tech.name,
              description: tech.description,
              image: tech.image,
              color: tech.color,
            });
          } else {
            console.error("No technology found.");
          }
        })
        .catch((error) => console.error("Error fetching technology:", error));
    }, [title]);

    return <Boxes index={index} data={technology} />;
  };

  return (
    <>
      <section id="roadmap">
        {!isLoading ? (
          <>
            <h1>
              <i
                className="fa-solid fa-circle-left"
                onClick={() => {
                  window.localStorage.setItem(
                    "last-page",
                    `/roadmap/${roadmapName}`
                  );
                  if (window.history.length > 2) {
                    navigate(-1);
                  } else {
                    navigate("/roadmap");
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
                          if (typeof sources === "string") {
                            return <></>;
                          } else {
                            return (
                              <li key={index * index}>
                                {rdmp[1]?.title ? (
                                  <LoadTechnology
                                    title={rdmp[1]?.title}
                                    index={index * index}
                                  />
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
