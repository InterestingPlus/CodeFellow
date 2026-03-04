import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Boxes = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`language-box ${
        data?.name.toLowerCase().split(" ").join("-").split(".")[0] || ""
      }`}
      style={{ "--tech-color": data?.color }}
      onClick={() => {
        setTimeout(() => {
          navigate(
            `/learn/${data?.name.toLowerCase().split(" ").join("-") || ""}`
          );
          window.localStorage.setItem(
            "last-page",
            `/learn/${data?.name.toLowerCase().split(" ").join("-") || ""}`
          );
        }, 300);
      }}
    >
      <img src={`/images/${data?.image || ""}`} alt={data?.name || ""} />
      <h3>{data?.name || ""}</h3>
      <p>{data?.description || ""}</p>
    </motion.button>
  );
};

export default Boxes;
