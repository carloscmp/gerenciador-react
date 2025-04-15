import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(to bottom, #00264d, #004080)",
        color: "white",
        paddingTop: "20px",
      }}
    >
      <div className="text-center">{children}</div>
    </div>
  );
};

export default Layout;
