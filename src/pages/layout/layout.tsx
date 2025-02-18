import Header from "components/header/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const squareSize = 200; // Change this to control the size of the squares

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(14, 14, 14)",
        /*   backgroundImage: `
          linear-gradient(transparent ${
            squareSize - 1
          }px, rgba(255, 255, 255, 0.05) ${squareSize}px), 
          linear-gradient(90deg, transparent ${
            squareSize - 1
          }px, rgba(255, 255, 255, 0.05) ${squareSize}px)`,
        backgroundSize: `${squareSize}px ${squareSize}px`, // Uses the variable for sizing */
        cursor: "none",
      }}
    >
      <div style={{ paddingTop: "4rem" }}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
