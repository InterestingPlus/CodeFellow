import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Boxes from "./Boxes";

const AllTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);

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

  return (
    <section id="technologies" style={{ marginTop: "68px" }}>
      <h1>
        <i
          className="fa-solid fa-circle-left"
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        ></i>{" "}
        All Technologies :
      </h1>

      <div className="tech">
        {technologies?.map((technology, index) => (
          <Boxes key={index} data={technology} />
        ))}
      </div>
    </section>
  );
};

export default AllTechnologies;
