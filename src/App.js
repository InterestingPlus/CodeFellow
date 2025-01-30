import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop.js";
import Home from "./components/Home";
import ResourcePage from "./components/ResourcePage";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/learn/:techName" element={<ResourcePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
