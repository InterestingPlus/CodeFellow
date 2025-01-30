import React from "react";
import "./Header.scss";

// import Logo from "../images/Logo.png";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo_Backup.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
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
    </header>
  );
};

export default Header;
