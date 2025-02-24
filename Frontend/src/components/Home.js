import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Boxes from "./Boxes";
import "./Main.scss";
import Roadmaps from "./Roadmaps";

const Home = () => {
  const [technologies, setTechnologies] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);

  const navigate = useNavigate();

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
        setTechnologies(cachedData.technologies);
        setRoadmaps(cachedData.roadmaps);
      }

      console.log("Fetching data from JSON...");
      // Fetch data from the JSON file
      fetch("/data.json")
        .then((response) => response.json())
        .then(async (data) => {
          const technologiesData = data[0]?.technologies || [];
          const roadmapsData = data[1]?.roadmaps.slice(0, 6) || [];

          // Update state
          setTechnologies(technologiesData);
          setRoadmaps(roadmapsData);

          // Cache data in IndexedDB
          await db.put("data", {
            key: "homePageData",
            technologies: technologiesData,
            roadmaps: roadmapsData,
          });
        })
        .catch((error) => console.error("Error fetching JSON:", error));
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Select the hero section
    const heroElement = document.querySelector("section.hero");

    const handleMouseMove = (e) => {
      if (!heroElement) return;

      // Calculate background position based on mouse movement
      let x = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 30;
      let y =
        ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 30 * -1;

      heroElement.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };

    setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleMouseMove);
    }, 600);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            Welcome to Code<span>Fellow</span>
          </h1>
          <p>Your ultimate destination to explore and learn technologies!</p>

          <div>
            <a href="#technologies" className="cta-button">
              Get Started
            </a>
            <a href="#roadmaps" className="cta-button roadmap-btn">
              Roadmaps
            </a>
          </div>

          <div className="social">
            <span>
              <a
                href="https://github.com/InterestingPlus"
                target="_blank"
                rel="noreferrer"
                id="github"
              >
                <i class="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/Jatin-Poriya"
                target="_blank"
                rel="noreferrer"
                id="linkedin"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://wa.me/917201840095"
                target="_blank"
                rel="noreferrer"
                id="whatsapp"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href="https://wa.me/917201840095"
                target="_blank"
                rel="noreferrer"
                id="instagram"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
            </span>
            <a
              href="https://JatinPoriya.epizy.com"
              target="_blank"
              rel="noreferrer"
            >
              <h2>Jatin Poriya</h2>
            </a>
          </div>
        </div>
      </section>

      <section id="technologies">
        <h1>Technologies :</h1>

        <div className="tech">
          {technologies?.slice(0, 10).map((technology, index) => (
            <Boxes key={index} data={technology} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            navigate("/learn");
          }}
          id="view-all-techs"
        >
          View All Technologies
        </button>
      </section>

      <section id="roadmaps">
        <h1>Roadmaps :</h1>

        <Roadmaps roadmaps={roadmaps} />
        <button
          type="button"
          onClick={() => {
            navigate("/roadmap");
          }}
          id="view-all-techs"
        >
          View All Roadmaps
        </button>
      </section>
    </>
  );
};

export default Home;
