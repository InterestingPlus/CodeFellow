import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";
import "./Main.scss";

const Home = () => {
  const [technologies, setTechnologies] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    // Fetch technologies data
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setTechnologies(data))
      .catch((error) => console.error("Error fetching JSON:", error));
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
    </>
  );
};

export default Home;
