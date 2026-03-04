import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Playlist from "./FetchThumbnail";
import { Helmet } from "react-helmet-async";
import ShareButton from "./ShareButton";

const ResourcePage = () => {
  const { techName } = useParams();
  const [resources, setResources] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    window.localStorage.setItem("last-page", `/learn/${techName}`);

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const tech = data[0].technologies.find(
          (item) =>
            item.name.toLowerCase().split(" ").join("-") ===
            techName.toLowerCase()
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
      {name && (
        <Helmet>
          <title>Learn {name} - Best Resources & Tutorials</title>
          <meta
            name="description"
            content={`Explore the best tutorials and resources to learn ${name}.`}
          />
          <meta
            name="keywords"
            content={`${name}, Learn ${name}, ${name} Tutorials`}
          />
          <meta
            property="og:title"
            content={`Learn ${name} - Best Resources & Tutorials`}
          />
          <meta
            property="og:description"
            content={`Find top-rated tutorials and learning paths for ${name}.`}
          />
        </Helmet>
      )}

      <section id="resources">
        {!isLoading ? (
          <>
            <h1>
              <i
                className="fa-solid fa-circle-left"
                onClick={() => {
                  navigate(`/learn#${techName.toLowerCase()}`);
                  window.localStorage.setItem(
                    "last-page",
                    `/learn#${techName.toLowerCase()}`
                  );
                }}
              ></i>
              {name ? `Resources to Learn ${name}` : `${name} not Found!`}
              <br />
            </h1>

            <div>
              <ShareButton techName={name} linkText={techName} />
            </div>

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
            Loading {name}
          </h1>
        )}
      </section>
    </>
  );
};

export default ResourcePage;
