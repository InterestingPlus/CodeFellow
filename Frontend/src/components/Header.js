import React from "react";
import "./Header.scss";

// import Logo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo_Backup.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">
        <img
          src={Logo}
          alt="CodeFellow"
          onClick={() => {
            navigate("/");
          }}
        />
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          <span>Code</span>Fellow
        </h2>
      </div>

      <ul>
        <li>
          <Link to="/learn">Technologies</Link>
        </li>
        <li>
          <Link to="/roadmap">Roadmaps</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
