import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
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
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation(); // ✅ Must be inside Router

  return (
    <AnimatePresence mode="wait">
      {/* ✅ Use `mode="wait"` instead of `exitBeforeEnter` */}
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<AllTechnologies />} />
        <Route path="/learn/:techName" element={<ResourcePage />} />
        <Route path="/roadmap" element={<AllRoadmaps />} />
        <Route path="/roadmap/:roadmapName" element={<RoadmapPage />} />
        <Route path="/roadmap/:roadmapName/:stepIndex" element={<Roadmap />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes /> {/* ✅ Moved routing inside a new component */}
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
