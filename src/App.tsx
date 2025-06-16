import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import AnimatedPage from "components/AnimatedPage";

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <HomePage />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <AboutMePage />
            </AnimatedPage>
          }
        />
        <Route
          path="/web"
          element={
            <AnimatedPage>
              <WebProjectsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/game"
          element={
            <AnimatedPage>
              <GameProjectsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/mobile"
          element={
            <AnimatedPage>
              <MobileProjectsPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/web/:projectName"
          element={
            <AnimatedPage>
              <WebProjectDetailPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/game/:projectName"
          element={
            <AnimatedPage>
              <GameProjectDetailPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/mobile/:projectName"
          element={
            <AnimatedPage>
              <MobileProjectDetailPage />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <Router>
    <Layout>
      <AnimatedRoutes />
    </Layout>
  </Router>
);

export default App;
