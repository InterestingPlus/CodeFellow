import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Roadmaps from "./Roadmaps";

const AllRoadmaps = () => {
  const [technologies, setTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);

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

          setTechnologies(roadmapsData);
          setFilteredRoadmaps(roadmapsData);

          await db.put("data", {
            key: "homePageData",
            technologies: technologiesData,
            roadmaps: roadmapsData,
          });

          // ❗ State updates asynchronously, so use useEffect to check updated values
        })
        .catch((error) => console.error("Error fetching JSON:", error));
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRoadmaps(
      technologies?.filter(
        (roadmap) =>
          roadmap.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase().trim()) ||
          roadmap.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase().trim())
      )
    );
  }, [searchQuery, technologies]);

  useEffect(() => {
    let localQuery = window.localStorage.getItem("roadmap-query");

    window.localStorage.setItem("last-page", "/roadmap");

    if (localQuery) {
      setSearchQuery(localQuery);
    }
  }, []);

  function handleSearch(query) {
    setSearchQuery(query);

    window.localStorage.setItem("roadmap-query", query);
  }

  return (
    <section id="technologies" className="all" style={{ marginTop: "68px" }}>
      <div className="heading-flex">
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
            style={{ cursor: "pointer" }}
          ></i>
          All Roadmaps :
        </h1>

        <span>
          {/* 🔍 Search Input */}
          <input
            type="text"
            placeholder="Search Roadmap..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            id="search-box"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>

      <section id="roadmaps">
        <Roadmaps roadmaps={filteredRoadmaps} />
      </section>
    </section>
  );
};

export default AllRoadmaps;
