import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Boxes from "./Boxes";

const AllTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected suggestion

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
      const cachedData = await db.get("data", "homePageData");

      if (cachedData) {
        setTechnologies(cachedData.technologies);
      }

      console.log("Fetching data from JSON...");
      fetch("/data.json")
        .then((response) => response.json())
        .then(async (data) => {
          const technologiesData = data[0]?.technologies || [];
          const roadmapsData = data[1]?.roadmaps || [];

          setTechnologies(technologiesData);

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
    let localQuery = window.localStorage.getItem("tech-query");
    window.localStorage.setItem("last-page", "/learn");

    document.getElementById("search-box").focus();

    if (localQuery) {
      setSearchQuery(localQuery);
    }
  }, []);

  function handleSearch(query) {
    setSearchQuery(query);
    window.localStorage.setItem("tech-query", query);

    if (query.length > 0) {
      const filtered = technologies
        .filter((tech) => tech.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          // ✅ Prioritize technologies where the query appears at the start
          const indexA = a.name.toLowerCase().indexOf(query.toLowerCase());
          const indexB = b.name.toLowerCase().indexOf(query.toLowerCase());

          return indexA - indexB;
        });
      setSuggestions(filtered);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
    }
  }

  function handleSelectSuggestion(name) {
    handleSearch(name);
    setSuggestions([]);
    setSelectedIndex(0);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && suggestions.length > 0) {
      handleSelectSuggestion(suggestions[selectedIndex].name);
    } else if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  }

  function HighlightSuggestion(suggestion) {
    if (!searchQuery) return suggestion;

    const regex = new RegExp(`(${searchQuery})`, "gi");

    return suggestion.replace(regex, (match) => `<b>${match}</b>`);
  }

  return (
    <section id="technologies" style={{ marginTop: "68px" }}>
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
          All Technologies :
        </h1>

        <span className="search-container">
          {/* 🔍 Search Input */}
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              handleSearch(e.target.value);
            }}
            id="search-box"
            autoComplete="off"
            style={{
              paddingLeft: `${searchQuery.length > 0 ? "3rem" : "1.6rem"}`,
            }}
          />

          {searchQuery.length > 0 ? (
            <i
              class="fa-regular fa-circle-xmark"
              id="close-ico"
              onClick={() => {
                handleSearch("");
                document.getElementById("search-box").focus();
              }}
            ></i>
          ) : (
            <></>
          )}

          <i
            className="fa-solid fa-magnifying-glass"
            id="search-ico"
            onClick={() => {
              setSuggestions([]);
            }}
          ></i>

          {/* Custom Suggestions List */}
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((tech, index) => (
                <li
                  key={index}
                  className={index === selectedIndex ? "selected" : ""}
                  onClick={() => handleSelectSuggestion(tech.name)}
                  dangerouslySetInnerHTML={{
                    __html: HighlightSuggestion(tech.name),
                  }}
                ></li>
              ))}
            </ul>
          )}
        </span>
      </div>

      <div className="tech scroll">
        {technologies
          ?.filter(
            (tech) =>
              tech.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase().trim()) ||
              tech.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase().trim())
          )
          ?.map((technology, index) => (
            <Boxes key={index} data={technology} />
          ))}
      </div>
    </section>
  );
};

export default AllTechnologies;
