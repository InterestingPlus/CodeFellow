import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import AllTechnologies from "./components/AllTechnologies";
import Home from "./components/Home";
import ResourcePage from "./components/ResourcePage";
import RoadmapPage from "./components/RoadmapPage";
import Roadmap from "./components/Roadmap";
import { HelmetProvider } from "react-helmet-async";
import AllRoadmaps from "./components/AllRoadmaps";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<AllTechnologies />} />
            <Route path="/learn/:techName" element={<ResourcePage />} />

            <Route path="/roadmap" element={<AllRoadmaps />} />
            <Route path="/roadmap/:roadmapName" element={<RoadmapPage />} />
            <Route
              path="/roadmap/:roadmapName/:stepIndex"
              element={<Roadmap />}
            />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
