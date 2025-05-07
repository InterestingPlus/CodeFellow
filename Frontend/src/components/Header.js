import React, { useEffect } from "react";
import "./Header.scss";

// import Logo from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo_Backup.png";

import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      let lastPage = window.localStorage.getItem("last-page");

      if (lastPage) {
        navigate(lastPage);
      }
    }, 800);
  });

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50, y: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="logo"
        onClick={() => {
          window.localStorage.setItem("last-page", "/");

          navigate("/");
        }}
      >
        <img src={Logo} alt="CodeFellow" />
        <h2>
          <span>Code</span>Fellow
        </h2>
      </motion.div>

      <ul>
        <motion.li
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
        >
          <Link to="/learn">Technologies</Link>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
        >
          <Link to="/roadmap">Roadmaps</Link>
        </motion.li>
      </ul>
    </motion.header>
  );
};

export default Header;
