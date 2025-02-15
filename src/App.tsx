import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  AboutMePage,
  WebProjectsPage,
  GameProjectsPage,
  MobileProjectsPage,
  WebProjectDetailPage,
  GameProjectDetailPage,
  MobileProjectDetailPage,
  Layout,
} from "pages";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/web" element={<WebProjectsPage />} />
          <Route path="/game" element={<GameProjectsPage />} />
          <Route path="/mobile" element={<MobileProjectsPage />} />
          <Route path="/web/:projectName" element={<WebProjectDetailPage />} />
          <Route
            path="/game/:projectName"
            element={<GameProjectDetailPage />}
          />
          <Route
            path="/mobile/:projectName"
            element={<MobileProjectDetailPage />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
