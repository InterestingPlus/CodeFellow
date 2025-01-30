import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";
import "./Main.scss";
import Roadmap from "./Roadmap";

const Home = () => {
  const [technologies, setTechnologies] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  // Initialize IndexedDB
  const initDB = async () => {
    return openDB("CodeFellowDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("data")) {
          db.createObjectStore("data", { keyPath: "key" });
        }
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const db = await initDB();

      // Check if cached data exists
      const cachedData = await db.get("data", "homePageData");

      if (cachedData) {
        console.log("Data retrieved from IndexedDB:", cachedData);
        setTechnologies(cachedData.technologies);
        setRoadmaps(cachedData.roadmaps);
        return;
      }

      console.log("Fetching data from JSON...");
      // Fetch data from the JSON file
      fetch("/data.json")
        .then((response) => response.json())
        .then(async (data) => {
          const technologiesData = data[0]?.technologies || [];
          const roadmapsData = data[1]?.roadmaps || [];

          // Update state
          setTechnologies(technologiesData);
          setRoadmaps(roadmapsData);

          // Cache data in IndexedDB
          await db.put("data", {
            key: "homePageData",
            technologies: technologiesData,
            roadmaps: roadmapsData,
          });

          console.log("Data cached in IndexedDB.");
        })
        .catch((error) => console.error("Error fetching JSON:", error));
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Select the hero section
    const heroElement = document.querySelector("section.hero");
    setBgImage(heroElement);

    const handleMouseMove = (e) => {
      if (!heroElement) return;

      // Calculate background position based on mouse movement
      let x = (e.clientX / window.innerWidth) * 30;
      let y = (e.clientY / window.innerHeight) * 30;

      heroElement.style.backgroundPosition = `${x}% ${y}%`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
