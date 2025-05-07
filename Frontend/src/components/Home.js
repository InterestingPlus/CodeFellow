import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Boxes from "./Boxes";
import "./Main.scss";
import Roadmaps from "./Roadmaps";

import { motion } from "framer-motion";

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
      <motion.section
        className="hero"
        initial={{ backgroundSize: "50%" }}
        animate={{ backgroundSize: "100%" }}
        transition={{ duration: 0.8, type: "tween" }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Welcome to Code
            <span>Fellow</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Your ultimate destination to explore and learn technologies!
          </motion.p>

          <div>
            <motion.a
              initial={{ opacity: 0, scale: 0, y: -30, x: 90 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: 0,
              }}
              transition={{ duration: 0.2, delay: 0.6 }}
              href="#technologies"
              className="cta-button"
              onClick={() => {
                setTimeout(() => {
                  navigate("/learn");
                }, 1000);
              }}
            >
              Get Started
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0, y: -30, x: -90 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: 0,
              }}
              transition={{ duration: 0.2, delay: 0.8 }}
              href="#roadmaps"
              className="cta-button roadmap-btn"
              onClick={() => {
                setTimeout(() => {
                  navigate("/roadmap");
                }, 1200);
              }}
            >
              Roadmaps
            </motion.a>
          </div>

          <div className="social">
            <span>
              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                href="https://github.com/InterestingPlus"
                target="_blank"
                rel="noreferrer"
                id="github"
              >
                <i class="fa-brands fa-github"></i>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.85 }}
                href="https://www.linkedin.com/in/Jatin-Poriya"
                target="_blank"
                rel="noreferrer"
                id="linkedin"
              >
                <i class="fa-brands fa-linkedin"></i>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                href="https://wa.me/917201840095"
                target="_blank"
                rel="noreferrer"
                id="whatsapp"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
                href="https://instagram.com/Jatin_Poriya_123"
                target="_blank"
                rel="noreferrer"
                id="instagram"
              >
                <i class="fa-brands fa-instagram"></i>
              </motion.a>
            </span>
            <motion.a
              initial={{ opacity: 0, scale: 0.7, y: 200 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
              href="https://JatinPoriya.epizy.com"
              target="_blank"
              rel="noreferrer"
            >
              <h2>Jatin Poriya</h2>
            </motion.a>
          </div>
        </div>
      </motion.section>

      <section id="technologies">
        <div className="effect">
          <span></span>
        </div>

        <h1 className="heading">Technologies :</h1>

        <div className="tech home">
          {technologies?.slice(0, 10).map((technology, index) => {
            return <Boxes index={index} data={technology} />;
          })}
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
