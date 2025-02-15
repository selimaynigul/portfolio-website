import React from "react";
import { CursorProvider } from "context/CursorContext";
import DotCursor from "components/DotCursor";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CursorProvider>
      <div className="bg" style={{ minHeight: "100vh" }}>
        <DotCursor />
        {children}
      </div>
    </CursorProvider>
  );
};

export default Layout;
