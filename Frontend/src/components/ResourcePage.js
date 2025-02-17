import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Playlist from "./FetchThumbnail";

const ResourcePage = () => {
  const { techName } = useParams();
  const [resources, setResources] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const tech = data[0].technologies.find(
          (item) => item.name.toLowerCase() === techName.toLowerCase()
        );

        if (tech) {
          setName(tech.name);

          if (tech.resources) {
            setResources(tech.resources);
          }
        } else {
          console.log("No resources found.");
          setResources([]);
        }

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [techName]);

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

              {name ? `Resources to Learn ${name}` : `${techName} not Found!`}
            </h1>

            {resources ? (
              resources?.length > 0 ? (
                <ul>
                  {resources.map((resource, index) => (
                    <Playlist
                      index={index}
                      category={resource.category}
                      url={resource.link}
                      type={resource.type}
                    />
                  ))}
                </ul>
              ) : (
                <p>No Resources available for {techName}.</p>
              )
            ) : (
              <p>Loading Resources for {techName}</p>
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
            Loading {techName}
          </h1>
        )}
      </section>
    </>
  );
};

export default ResourcePage;
