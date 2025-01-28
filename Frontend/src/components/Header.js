import React from "react";
import "./Header.scss";

// import Logo from "../images/Logo.png";
import Logo from "../images/Logo_Backup.png";

const Header = () => {
  return (
    <header>
      <img src={Logo} alt="CodeFellow" />
      <h2>
        <span>Code</span>Fellow
      </h2>
    </header>
  );
};

export default Header;
