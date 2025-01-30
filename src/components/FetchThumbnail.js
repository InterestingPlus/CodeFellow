import axios from "axios";
import { openDB } from "idb";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Playlist = ({ url, index, category, type }) => {
  const [details, setDetails] = useState(null);

  // Function to initialize IndexedDB
  const initDB = async () => {
    return openDB("PlaylistDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("playlists")) {
          db.createObjectStore("playlists", { keyPath: "id" });
        }
      },
    });
  };

  // Function to extract the ID (playlist or video)
  const getId = () => {
    try {
      const urlObj = new URL(url);

      if (type === "playlist") {
        return urlObj.searchParams.get("list");
      } else if (type === "video") {
        return urlObj.searchParams.get("v");
      }
      return null;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const id = getId();
      if (!id) {
        console.error("No valid ID found. Skipping fetch.");
        return;
      }

      const db = await initDB();
      const cachedData = await db.get("playlists", id);

      if (cachedData) {
        console.log("Data retrieved from IndexedDB:", cachedData);
        setDetails(cachedData.details);
        return;
      }

      console.log("Fetching data from API...");
      try {
        const API_KEY = "AIzaSyBC5nU71xu5wuYUjOuBJW1CuLmwaMaZ2cc";

        let fetchedDetails = null;

        if (type === "playlist") {
          // Fetch Playlist Details
          const detailsURL = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}`;
          const detailsResponse = await axios.get(detailsURL);

          const detailsData = detailsResponse.data.items[0]?.snippet;
          if (detailsData) {
            const channelId = detailsData.channelId;

            // Fetch Channel Details to get the logo
            const channelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
            const channelResponse = await axios.get(channelURL);

            const channelLogo =
              channelResponse.data.items[0].snippet.thumbnails.high.url;

            fetchedDetails = {
              title: detailsData.title,
              thumbnail: detailsData.thumbnails.maxres.url,
              channelName: detailsData.channelTitle,
              channelLogo: channelLogo,
            };
          }
        } else if (type === "video") {
          // Fetch Video Details
          const videoURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`;
          const videoResponse = await axios.get(videoURL);

          const videoData = videoResponse.data.items[0]?.snippet;
          if (videoData) {
            const channelId = videoData.channelId;

            // Fetch Channel Details to get the logo
            const channelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
            const channelResponse = await axios.get(channelURL);

            const channelLogo =
              channelResponse.data.items[0].snippet.thumbnails.high.url;

            fetchedDetails = {
              title: videoData.title,
              thumbnail: videoData.thumbnails.maxres.url,
              channelName: videoData.channelTitle,
              channelLogo: channelLogo,
            };
          }
        }

        if (fetchedDetails) {
          // Save fetched data to IndexedDB
          await db.put("playlists", { id, details: fetchedDetails });
          setDetails(fetchedDetails);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, [url, type]);

  if (!details) {
    return (
      <li key={index} className="loading">
        <Link to={url} target="_blank" rel="noopener noreferrer">
          <span className="h3"></span>
          <span className="img"></span>
          <span className="h1"></span>
          <div className="author_info">
            <div className="img"></div>
            <div className="p"></div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li key={index}>
      <Link to={url} target="_blank" rel="noopener noreferrer">
        <h3>{category}</h3>
        <img
          src={details.thumbnail}
          alt={details.title}
          className="thumbnail"
        />
        <h1>{details.title}</h1>
        <div className="author_info">
          <img
            src={details.channelLogo}
            alt={details.channelName}
            className="channel-logo"
          />
          <p>by {details.channelName}</p>
        </div>
      </Link>
    </li>
  );
};

export default Playlist;
