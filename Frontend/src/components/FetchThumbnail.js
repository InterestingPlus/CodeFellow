import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Playlist = ({ playlistUrl, index, category }) => {
  const [playlistDetails, setPlaylistDetails] = useState(null);

  // Function to extract playlist ID
  const getPlaylistId = () => {
    try {
      const urlObj = new URL(playlistUrl);
      return urlObj.searchParams.get("list");
    } catch (error) {
      console.error("Invalid playlist URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const playlistId = getPlaylistId();

    if (!playlistId) {
      console.error("No playlist ID found. Skipping fetch.");
      return;
    }

    const fetchData = async () => {
      try {
        const API_KEY = "AIzaSyBC5nU71xu5wuYUjOuBJW1CuLmwaMaZ2cc";

        // Fetch Playlist Details
        const detailsURL = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
        const detailsResponse = await axios.get(detailsURL);

        const details = detailsResponse.data.items[0]?.snippet;
        if (details) {
          const channelId = details.channelId; // Get channel ID

          // Fetch Channel Details to get the logo
          const channelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
          const channelResponse = await axios.get(channelURL);

          const channelLogo =
            channelResponse.data.items[0].snippet.thumbnails.high.url;

          console.log(details);

          setPlaylistDetails({
            title: details.title,
            thumbnail: details.thumbnails.maxres.url,
            channelName: details.channelTitle,
            channelLogo: channelLogo, // Add channel logo
          });
        } else {
          console.warn("No playlist details found for ID:", playlistId);
        }
      } catch (error) {
        console.error("Error fetching playlist or channel data:", error);
      }
    };

    fetchData();
  }, [playlistUrl]);

  if (!playlistDetails) {
    return (
      <li key={index} className="loading">
        <span className="h3"></span>
        <span className="img"></span>
        <span className="h1"></span>
        <div className="author_info">
          <div className="img"></div>
          <div className="p"></div>
        </div>
      </li>
    );
  }

  return (
    <li key={index}>
      <Link to={playlistUrl} target="_blank" rel="noopener noreferrer">
        <h3>{category}</h3>
        <img
          src={playlistDetails.thumbnail}
          alt={playlistDetails.title}
          className="thumbnail"
        />
        <h1>{playlistDetails.title}</h1>
        <div className="author_info">
          <img
            src={playlistDetails.channelLogo}
            alt={playlistDetails.channelName}
            className="channel-logo"
          />
          <p>by {playlistDetails.channelName}</p>
        </div>
      </Link>
    </li>
  );
};

export default Playlist;
