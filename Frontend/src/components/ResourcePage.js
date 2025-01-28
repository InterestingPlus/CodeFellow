import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Playlist from "./FetchThumbnail";

const ResourcePage = () => {
  const { techName } = useParams();
  const [resources, setResources] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const tech = data.find(
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
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [techName]);

  return (
    <>
      <section id="resources">
        <h1>
          <Link to="/">
            <i className="fa-solid fa-circle-left"></i>
          </Link>
          Resources to Learn {name}
        </h1>

        {resources.length > 0 ? (
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
          <p>No resources available for {techName}.</p>
        )}
      </section>
    </>
  );
};

export default ResourcePage;
