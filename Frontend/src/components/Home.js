import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Boxes from "./Boxes";
import "./Main.scss";

const Home = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setTechnologies(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  // const [categories, setCategories] = useState([]);
  // const [featured, setFeatured] = useState([]);

  // Fetch data from JSON or API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/data.json");
  //       setCategories(response.data);

  //       setFeatured(response.data.sort(() => 0.5 - Math.random()).slice(0, 3));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const bgImage = document.querySelector("section.hero");

    window.addEventListener("mousemove", (e) => {
      // innerWidth = 100
      // e.pageX = ?

      let x = (e.pageX / window.innerWidth) * 5;
      let y = (e.pageY / window.innerHeight) * 5;

      console.log("x: ", x, "y: ", y);

      bgImage.style.backgroundPosition = `${x}% ${y}%`;
    });

    console.log(bgImage);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>
            Welcome to Code<span>Fellow</span>
          </h1>
          {/* <h1>
            Welcome to <span className="a">C</span>ode
            <span className="a">F</span>ellow
          </h1> */}
          <p>Your ultimate destination to explore and learn technologies!</p>
          <Link to="/learn/HTML" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      {/* <section className="categories">
        <div className="container">
          <h2>Explore Categories</h2>
          <ul className="categories-list">
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={`/learn/${category.name}`}>
                  <img
                    src={`../images/${category?.image || ""}`}
                    alt={category.name}
                  />
                  <h3>{category.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* Featured Section */}
      {/* <section className="featured">
        <div className="container">
          <h2>Featured Resources</h2>
          <ul className="featured-list">
            {featured.map((item, index) => (
              <li key={index}>
                <Link to={`/learn/${item.name}`}>
                  <img src={`../images/${item?.image || ""}`} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>  
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      <section id="technologies">
        <h1>Technologies :</h1>

        <div className="tech">
          {technologies?.map((technology) => {
            return <Boxes data={technology} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
