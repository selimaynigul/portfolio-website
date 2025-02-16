import Header from "components/header/Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgb(14, 14, 14)",
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
