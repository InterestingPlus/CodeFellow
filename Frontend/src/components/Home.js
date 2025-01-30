import React, { useEffect, useState, useMemo } from "react";
import Boxes from "./Boxes";
import "./Main.scss";
import Roadmap from "./Roadmap";

const Home = () => {
  const [technologies, setTechnologies] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);

  // Memoize the technologies and roadmaps data
  const memoizedData = useMemo(() => ({ technologies, roadmaps }), [technologies, roadmaps]);

  useEffect(() => {
    // Fetch and update data if it doesn't match memoized data
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const fetchedTechnologies = data[0]?.technologies || [];
        const fetchedRoadmaps = data[1]?.roadmaps || [];

        // Compare fetched data with memoized data
        if (
          JSON.stringify(fetchedTechnologies) !== JSON.stringify(memoizedData.technologies) ||
          JSON.stringify(fetchedRoadmaps) !== JSON.stringify(memoizedData.roadmaps)
        ) {
          setTechnologies(fetchedTechnologies);
          setRoadmaps(fetchedRoadmaps);
        }
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, [memoizedData]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>
            Welcome to Code<span>Fellow</span>
          </h1>
          <p>Your ultimate destination to explore and learn technologies!</p>
          <a href="#technologies" className="cta-button">
            Get Started
          </a>
        </div>
      </section>

      <section id="technologies">
        <h1>Technologies :</h1>
        <div className="tech">
          {technologies?.map((technology, index) => (
            <Boxes key={index} data={technology} />
          ))}
        </div>
      </section>

      <section id="roadmaps">
        <h1>Roadmaps :</h1>
        <Roadmap roadmaps={roadmaps} />
      </section>
    </>
  );
};

export default Home;