import Header from "components/header/Header";
import StyledTitle from "components/header/StyledTitle";
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
      }}
    >
      <Header />
      {children}
    </div>
  );
};

export default Layout;
