import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import AllTechnologies from "./components/AllTechnologies";
import Home from "./components/Home";
import ResourcePage from "./components/ResourcePage";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<AllTechnologies />} />
          <Route path="/learn/:techName" element={<ResourcePage />} />

          {/* <Route path="/roadmap" element={<AllTechnologies />} />
          <Route path="/roadmap/:roadmapName" element={<ResourcePage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
